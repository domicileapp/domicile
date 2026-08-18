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

	r := Routes(store)

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
			path:   "/?sort=name&direction=asc",
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
