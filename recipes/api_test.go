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
			path:   "/",
			setup: func(s *RecipeStoreMock) {
				s.CountRecipesFunc = func(ctx context.Context) (int64, error) {
					return 2, nil
				}
				s.ListRecipesFunc = func(ctx context.Context, limit, offset int32) ([]db.ListRecipesRow, error) {
					if limit != 12 || offset != 0 {
						t.Fatalf("expected default limit=12 offset=0, got limit=%d offset=%d", limit, offset)
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
				if got.TotalItems != 2 || len(got.Items) != 2 {
					t.Fatalf("expected 2 total/2 items, got total=%d items=%d", got.TotalItems, len(got.Items))
				}
			},
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
