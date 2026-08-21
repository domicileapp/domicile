package recipes

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/pkg/scraper"
	"github.com/jackc/pgx/v5"
)

type apiTestCase struct {
	name   string
	method string
	path   string
	body   string

	setup func(s *RecipeStoreMock)

	wantStatus int
	checkBody  func(t *testing.T, rec *httptest.ResponseRecorder)
}

func runAPITest(t *testing.T, tc apiTestCase) {
	t.Helper()

	store := &RecipeStoreMock{}
	if tc.setup != nil {
		tc.setup(store)
	}

	r := Routes(store, nil)

	var body *bytes.Buffer
	if tc.body != "" {
		body = bytes.NewBufferString(tc.body)
	} else {
		body = bytes.NewBufferString("")
	}

	req := httptest.NewRequest(tc.method, tc.path, body)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != tc.wantStatus {
		t.Fatalf("expected status %d, got %d: %s", tc.wantStatus, rec.Code, rec.Body.String())
	}

	if tc.checkBody != nil {
		tc.checkBody(t, rec)
	}
}

func TestRecipeHandlers(t *testing.T) {
	cases := []apiTestCase{
		{
			name:   "list recipes",
			method: http.MethodGet,
			path:   "/?sort=name",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					if search != "" {
						t.Fatalf("expected empty search, got %q", search)
					}
					return 25, nil
				}

				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					if limit != 12 {
						t.Fatalf("expected limit=12, got %d", limit)
					}
					if offset != 0 {
						t.Fatalf("expected offset=0, got %d", offset)
					}
					if search != "" {
						t.Fatalf("expected empty search, got %q", search)
					}
					if sort != "name" {
						t.Fatalf("expected sort=name, got %q", sort)
					}
					if direction != "desc" {
						t.Fatalf("expected direction=desc, got %q", direction)
					}

					return []db.ListRecipesRow{
						{ID: 1, Name: "Chili"},
						{ID: 2, Name: "Pancakes"},
					}, nil
				}
			},
			wantStatus: http.StatusOK,
			checkBody: func(t *testing.T, rec *httptest.ResponseRecorder) {
				var got PaginatedResponse
				if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}

				if got.TotalItems != 25 {
					t.Fatalf("expected total_items=25, got %d", got.TotalItems)
				}

				if got.TotalPages != 3 {
					t.Fatalf("expected total_pages=3, got %d", got.TotalPages)
				}

				if got.Page != 1 {
					t.Fatalf("expected page=1, got %d", got.Page)
				}

				if got.Size != 12 {
					t.Fatalf("expected size=12, got %d", got.Size)
				}

				if len(got.Items) != 2 {
					t.Fatalf("expected 2 items, got %d", len(got.Items))
				}
			},
		},
		{
			name:       "list recipes - invalid sort",
			method:     http.MethodGet,
			path:       "/?sort=bogus&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "list recipes - non-numeric page",
			method:     http.MethodGet,
			path:       "/?page=abc&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "list recipes - non-numeric size",
			method:     http.MethodGet,
			path:       "/?size=xyz&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "list recipes - size exceeds max",
			method:     http.MethodGet,
			path:       "/?size=121&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "list recipes - size at max boundary",
			method: http.MethodGet,
			path:   "/?size=120&sort=name&direction=asc",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 0, nil
				}
				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					if limit != 120 {
						t.Fatalf("expected limit=120, got %d", limit)
					}
					return []db.ListRecipesRow{}, nil
				}
			},
			wantStatus: http.StatusOK,
		},
		{
			name:       "list recipes - negative page",
			method:     http.MethodGet,
			path:       "/?page=-1&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "list recipes - negative size",
			method:     http.MethodGet,
			path:       "/?size=-1&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "list recipes - page out of bounds",
			method: http.MethodGet,
			path:   "/?page=999&sort=name&direction=asc",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 25, nil
				}
				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					t.Fatalf("ListRecipes should not be called when page is out of bounds")
					return nil, nil
				}
			},
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "list recipes - zero results",
			method: http.MethodGet,
			path:   "/?search=nomatch&sort=name&direction=asc",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 0, nil
				}
				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					return []db.ListRecipesRow{}, nil
				}
			},
			wantStatus: http.StatusOK,
			checkBody: func(t *testing.T, rec *httptest.ResponseRecorder) {
				var got PaginatedResponse
				if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}
				if got.TotalItems != 0 {
					t.Fatalf("expected total_items=0, got %d", got.TotalItems)
				}
				if got.TotalPages != 0 {
					t.Fatalf("expected total_pages=0, got %d", got.TotalPages)
				}
				if len(got.Items) != 0 {
					t.Fatalf("expected 0 items, got %d", len(got.Items))
				}
			},
		},
		{
			name:   "list recipes - no query params, all defaults",
			method: http.MethodGet,
			path:   "/",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 1, nil
				}
				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					if limit != 12 {
						t.Fatalf("expected default limit=12, got %d", limit)
					}
					if offset != 0 {
						t.Fatalf("expected default offset=0, got %d", offset)
					}
					if search != "" {
						t.Fatalf("expected empty search, got %q", search)
					}
					if sort != "updated_at" {
						t.Fatalf("expected default sort=updated_at, got %q", sort)
					}
					if direction != "desc" {
						t.Fatalf("expected default direction=desc, got %q", direction)
					}
					return []db.ListRecipesRow{{ID: 1, Name: "Chili"}}, nil
				}
			},
			wantStatus: http.StatusOK,
			checkBody: func(t *testing.T, rec *httptest.ResponseRecorder) {
				var got PaginatedResponse
				if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}
				if got.Page != 1 {
					t.Fatalf("expected page=1, got %d", got.Page)
				}
				if got.Size != 12 {
					t.Fatalf("expected size=12, got %d", got.Size)
				}
			},
		},
		{
			name:   "list recipes - search",
			method: http.MethodGet,
			path:   "/?search=test&sort=name&direction=asc",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					if search != "test" {
						t.Fatalf("expected search=test, got %q", search)
					}
					return 2, nil
				}

				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					if search != "test" {
						t.Fatalf("expected search=test, got %q", search)
					}
					if limit != 12 || offset != 0 {
						t.Fatalf(
							"expected limit=12 offset=0, got limit=%d offset=%d",
							limit,
							offset,
						)
					}
					if sort != "name" {
						t.Fatalf("expected sort=name, got %q", sort)
					}
					if direction != "asc" {
						t.Fatalf("expected direction=asc, got %q", direction)
					}

					return []db.ListRecipesRow{
						{ID: 1, Name: "Chili"},
						{ID: 2, Name: "Pancakes"},
					}, nil
				}
			},
			wantStatus: http.StatusOK,
			checkBody: func(t *testing.T, rec *httptest.ResponseRecorder) {
				var got PaginatedResponse
				if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}

				if got.TotalItems != 2 {
					t.Fatalf("expected total_items=2, got %d", got.TotalItems)
				}

				if got.TotalPages != 1 {
					t.Fatalf("expected total_pages=1, got %d", got.TotalPages)
				}

				if len(got.Items) != 2 {
					t.Fatalf("expected 2 items, got %d", len(got.Items))
				}
			},
		},
		{
			name:   "list recipes - pagination",
			method: http.MethodGet,
			path:   "/?page=3&size=10&sort=created_at&direction=desc",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 25, nil
				}

				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					if limit != 10 {
						t.Fatalf("expected limit=10, got %d", limit)
					}
					if offset != 20 {
						t.Fatalf("expected offset=20, got %d", offset)
					}
					if sort != "created_at" {
						t.Fatalf("expected sort=created_at, got %q", sort)
					}
					if direction != "desc" {
						t.Fatalf("expected direction=desc, got %q", direction)
					}

					return []db.ListRecipesRow{
						{ID: 21, Name: "Recipe 21"},
					}, nil
				}
			},
			wantStatus: http.StatusOK,
			checkBody: func(t *testing.T, rec *httptest.ResponseRecorder) {
				var got PaginatedResponse
				if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}

				if got.TotalItems != 25 {
					t.Fatalf("expected total_items=25, got %d", got.TotalItems)
				}

				if got.TotalPages != 3 {
					t.Fatalf("expected total_pages=3, got %d", got.TotalPages)
				}

				if got.Page != 3 {
					t.Fatalf("expected page=3, got %d", got.Page)
				}

				if got.Size != 10 {
					t.Fatalf("expected size=10, got %d", got.Size)
				}
			},
		},
		{
			name:       "list recipes - invalid page",
			method:     http.MethodGet,
			path:       "/?page=0&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "list recipes - invalid size",
			method:     http.MethodGet,
			path:       "/?size=0&sort=name&direction=asc",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:       "list recipes - invalid direction",
			method:     http.MethodGet,
			path:       "/?sort=name&direction=sideways",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "list recipes - count error",
			method: http.MethodGet,
			path:   "/?sort=name&direction=asc",
			setup: func(s *RecipeStoreMock) {
				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					return []db.ListRecipesRow{}, nil
				}

				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 0, errors.New("database unavailable")
				}
			},
			wantStatus: http.StatusInternalServerError,
		},
		{
			name:   "list recipes - list error",
			method: http.MethodGet,
			path:   "/?sort=name&direction=asc",
			setup: func(s *RecipeStoreMock) {
				s.ListRecipesFunc = func(
					ctx context.Context,
					limit int32,
					offset int32,
					search string,
					sort string,
					direction string,
				) ([]db.ListRecipesRow, error) {
					return nil, errors.New("database unavailable")
				}

				s.CountRecipesFunc = func(ctx context.Context, search string) (int64, error) {
					return 0, nil
				}
			},
			wantStatus: http.StatusInternalServerError,
		},
		{
			name:   "get recipe not found",
			method: http.MethodGet,
			path:   "/42",
			setup: func(s *RecipeStoreMock) {
				s.GetRecipeFunc = func(ctx context.Context, id int64) (db.Recipe, error) {
					if id != 42 {
						t.Fatalf("expected id 42, got %d", id)
					}
					return db.Recipe{}, pgx.ErrNoRows
				}
			},
			wantStatus: http.StatusNotFound,
		},
		{
			name:   "get recipe database error",
			method: http.MethodGet,
			path:   "/42",
			setup: func(s *RecipeStoreMock) {
				s.GetRecipeFunc = func(ctx context.Context, id int64) (db.Recipe, error) {
					return db.Recipe{}, errors.New("connection pool exhausted")
				}
			},
			wantStatus: http.StatusInternalServerError,
		},
		{
			name:   "get recipe success",
			method: http.MethodGet,
			path:   "/42",
			setup: func(s *RecipeStoreMock) {
				s.GetRecipeFunc = func(ctx context.Context, id int64) (db.Recipe, error) {
					return db.Recipe{ID: 42, Name: "Chili"}, nil
				}
				s.ListRecipeIngredientsFunc = func(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error) {
					return []db.ListRecipeIngredientsRow{}, nil
				}
				s.ListRecipeInstructionsFunc = func(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error) {
					return []db.ListRecipeInstructionsRow{}, nil
				}
			},
			wantStatus: http.StatusOK,
		},
		{
			name:       "get recipe invalid id",
			method:     http.MethodGet,
			path:       "/not-a-number",
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "create recipe",
			method: http.MethodPost,
			path:   "/",
			body:   `{"name":"Chili"}`,
			setup: func(s *RecipeStoreMock) {
				s.CreateRecipeFunc = func(ctx context.Context, params createRecipeRequest) (db.Recipe, error) {
					if params.Name != "Chili" {
						t.Fatalf("expected name Chili, got %q", params.Name)
					}
					return db.Recipe{ID: 1, Name: params.Name}, nil
				}
			},
			wantStatus: http.StatusCreated,
			checkBody: func(t *testing.T, rec *httptest.ResponseRecorder) {
				var got db.Recipe
				if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
					t.Fatalf("failed to decode response: %v", err)
				}
				if got.ID != 1 {
					t.Fatalf("expected id 1, got %d", got.ID)
				}
			},
		},
		{
			name:       "create recipe missing name",
			method:     http.MethodPost,
			path:       "/",
			body:       `{"name":""}`,
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "update recipe",
			method: http.MethodPut,
			path:   "/7",
			body:   `{"name":"Chili v2"}`,
			setup: func(s *RecipeStoreMock) {
				s.UpdateRecipeFunc = func(ctx context.Context, id int64, params updateRecipeRequest) (db.Recipe, error) {
					if id != 7 || params.Name != "Chili v2" {
						t.Fatalf("unexpected args: id=%d name=%q", id, params.Name)
					}
					return db.Recipe{ID: 7, Name: params.Name}, nil
				}
			},
			wantStatus: http.StatusOK,
		},
		{
			name:       "update recipe missing name",
			method:     http.MethodPut,
			path:       "/7",
			body:       `{"name":""}`,
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "delete recipe",
			method: http.MethodDelete,
			path:   "/7",
			setup: func(s *RecipeStoreMock) {
				s.DeleteRecipeFunc = func(ctx context.Context, id int64) error {
					if id != 7 {
						t.Fatalf("expected id 7, got %d", id)
					}
					return nil
				}
			},
			wantStatus: http.StatusNoContent,
		},
		{
			name:   "create ingredient",
			method: http.MethodPost,
			path:   "/7/ingredients",
			body:   `{"raw_text":"1 cup flour","sort_order":1}`,
			setup: func(s *RecipeStoreMock) {
				s.CreateRecipeIngredientFunc = func(ctx context.Context, recipeID int64, params createIngredientRequest) (db.RecipeIngredient, error) {
					if recipeID != 7 || params.RawText != "1 cup flour" {
						t.Fatalf("unexpected args: recipeID=%d rawText=%q", recipeID, params.RawText)
					}
					return db.RecipeIngredient{ID: 100, RecipeID: recipeID, RawText: params.RawText}, nil
				}
			},
			wantStatus: http.StatusCreated,
		},
		{
			name:       "create ingredient missing raw_text",
			method:     http.MethodPost,
			path:       "/7/ingredients",
			body:       `{"raw_text":""}`,
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "update ingredient",
			method: http.MethodPut,
			path:   "/7/ingredients/55",
			body:   `{"raw_text":"2 cups flour","sort_order":1,"group_name":"Dry"}`,
			setup: func(s *RecipeStoreMock) {
				s.UpdateRecipeIngredientFunc = func(ctx context.Context, id int64, params updateIngredientRequest) error {
					if id != 55 || params.RawText != "2 cups flour" || params.GroupName != "Dry" {
						t.Fatalf("unexpected args: id=%d rawText=%q groupName=%q", id, params.RawText, params.GroupName)
					}
					return nil
				}
			},
			wantStatus: http.StatusNoContent,
		},
		{
			name:   "delete ingredient",
			method: http.MethodDelete,
			path:   "/7/ingredients/55",
			setup: func(s *RecipeStoreMock) {
				s.DeleteRecipeIngredientFunc = func(ctx context.Context, id int64) error {
					if id != 55 {
						t.Fatalf("expected id 55, got %d", id)
					}
					return nil
				}
			},
			wantStatus: http.StatusNoContent,
		},
		{
			name:   "create instruction",
			method: http.MethodPost,
			path:   "/7/instructions",
			body:   `{"content":"Preheat oven","sort_order":1}`,
			setup: func(s *RecipeStoreMock) {
				s.CreateRecipeInstructionFunc = func(ctx context.Context, recipeID int64, params createInstructionRequest) (db.RecipeInstruction, error) {
					if recipeID != 7 || params.Content != "Preheat oven" {
						t.Fatalf("unexpected args: recipeID=%d content=%q", recipeID, params.Content)
					}
					return db.RecipeInstruction{ID: 200, RecipeID: recipeID, Content: params.Content}, nil
				}
			},
			wantStatus: http.StatusCreated,
		},
		{
			name:       "create instruction missing content",
			method:     http.MethodPost,
			path:       "/7/instructions",
			body:       `{"content":""}`,
			wantStatus: http.StatusBadRequest,
		},
		{
			name:   "update instruction",
			method: http.MethodPut,
			path:   "/7/instructions/9",
			body:   `{"content":"Preheat oven","sort_order":2}`,
			setup: func(s *RecipeStoreMock) {
				s.UpdateRecipeInstructionFunc = func(ctx context.Context, id int64, params updateInstructionRequest) error {
					if id != 9 || params.Content != "Preheat oven" || params.SortOrder != 2 {
						t.Fatalf("unexpected args: id=%d content=%q sortOrder=%v", id, params.Content, params.SortOrder)
					}
					return nil
				}
			},
			wantStatus: http.StatusNoContent,
		},
		{
			name:   "delete instruction",
			method: http.MethodDelete,
			path:   "/7/instructions/9",
			setup: func(s *RecipeStoreMock) {
				s.DeleteRecipeInstructionFunc = func(ctx context.Context, id int64) error {
					if id != 9 {
						t.Fatalf("expected id 9, got %d", id)
					}
					return nil
				}
			},
			wantStatus: http.StatusNoContent,
		},
	}

	for _, tc := range cases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			runAPITest(t, tc)
		})
	}
}

type mockScraper struct {
	fn func(ctx context.Context, url, html string) (*scraper.Recipe, error)
}

func (m *mockScraper) Scrape(ctx context.Context, url, html string) (*scraper.Recipe, error) {
	return m.fn(ctx, url, html)
}

func TestImportRecipeHandler(t *testing.T) {
	store := &RecipeStoreMock{
		CreateFullRecipeFunc: func(ctx context.Context, params createFullRecipeRequest) (db.Recipe, []db.RecipeIngredient, []db.RecipeInstruction, error) {
			if params.Name != "Scraped Chili" {
				t.Fatalf("expected name Scraped Chili, got %q", params.Name)
			}
			if params.Source != "https://example.com/chili" {
				t.Fatalf("expected source https://example.com/chili, got %q", params.Source)
			}
			if params.Servings != "4 servings" {
				t.Fatalf("expected servings 4 servings, got %q", params.Servings)
			}
			if params.PrepTime != "1" {
				t.Fatalf("expected prep_time 1, got %q", params.PrepTime)
			}
			if params.CookTime != "2" {
				t.Fatalf("expected cook_time 2, got %q", params.CookTime)
			}
			if params.Nutrition != "120 calories" {
				t.Fatalf("expected nutrition 120 calories, got %q", params.Nutrition)
			}
			if len(params.Ingredients) != 2 {
				t.Fatalf("expected 2 ingredients, got %d", len(params.Ingredients))
			}
			if len(params.Instructions) != 1 {
				t.Fatalf("expected 1 instruction, got %d", len(params.Instructions))
			}
			recipe := db.Recipe{ID: 10, Name: params.Name, Source: &params.Source, Servings: &params.Servings, PrepTime: &params.PrepTime, CookTime: &params.CookTime, Nutrition: &params.Nutrition}
			ingredients := []db.RecipeIngredient{
				{ID: 1, RecipeID: 10, RawText: params.Ingredients[0].RawText, SortOrder: 1},
				{ID: 2, RecipeID: 10, RawText: params.Ingredients[1].RawText, SortOrder: 2},
			}
			instructions := []db.RecipeInstruction{
				{ID: 1, RecipeID: 10, Content: params.Instructions[0].Content, SortOrder: 1},
			}
			return recipe, ingredients, instructions, nil
		},
	}
	sc := &mockScraper{
		fn: func(ctx context.Context, url, html string) (*scraper.Recipe, error) {
			return &scraper.Recipe{
				Title:       "Scraped Chili",
				Description: "Hearty",
				Images:      []string{"https://example.com/photo.jpg"},
				Ingredients: []string{"1 cup beans", "2 cups stock"},
				Steps:       []string{"Simmer."},
				SourceURL:   "https://example.com/chili",
				Servings:    "4 servings",
				PrepTime:    "1",
				CookTime:    "2",
				Nutrition:   "120 calories",
			}, nil
		},
	}
	h := &Handler{Store: store, Scraper: sc}
	body := `{"url":"https://example.com/chili","html":"<html></html>"}`
	req := httptest.NewRequest(http.MethodPost, "/import", bytes.NewBufferString(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	h.ImportRecipeHandler(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", rec.Code, rec.Body.String())
	}
	var resp RecipeResponse
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if resp.ID != 10 || resp.Name != "Scraped Chili" {
		t.Fatalf("unexpected recipe: %+v", resp.Recipe)
	}
	if len(resp.Ingredients) != 2 || len(resp.Instructions) != 1 {
		t.Fatalf("unexpected ingredients/instructions counts: %d / %d", len(resp.Ingredients), len(resp.Instructions))
	}

	// missing url
	req2 := httptest.NewRequest(http.MethodPost, "/import", bytes.NewBufferString(`{"url":"","html":"<html>"}`))
	rec2 := httptest.NewRecorder()
	h.ImportRecipeHandler(rec2, req2)
	if rec2.Code != http.StatusBadRequest {
		t.Fatalf("expected 400 for missing url, got %d", rec2.Code)
	}

	scErr := &mockScraper{
		fn: func(ctx context.Context, url, html string) (*scraper.Recipe, error) {
			return nil, &scraper.ScraperError{Message: "no recipe found"}
		},
	}
	h2 := &Handler{Store: store, Scraper: scErr}
	req3 := httptest.NewRequest(http.MethodPost, "/import", bytes.NewBufferString(body))
	rec3 := httptest.NewRecorder()
	h2.ImportRecipeHandler(rec3, req3)
	if rec3.Code != http.StatusUnprocessableEntity {
		t.Fatalf("expected 422 for scraper error, got %d", rec3.Code)
	}
}
