package recipes

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/go-chi/chi/v5"
)

type fakeStore struct {
	t *testing.T

	listRecipesFn  func(ctx context.Context) ([]db.ListRecipesRow, error)
	getRecipeFn    func(ctx context.Context, id int64) (db.Recipe, error)
	createRecipeFn func(ctx context.Context, name, shortDescription string) (db.Recipe, error)
	updateRecipeFn func(ctx context.Context, id int64, name, shortDescription string) (db.Recipe, error)
	deleteRecipeFn func(ctx context.Context, id int64) error

	listRecipeIngredientsFn  func(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error)
	createRecipeIngredientFn func(ctx context.Context, recipeID int64, groupName string, sortOrder float64, rawText string) (db.RecipeIngredient, error)
	updateIngredientSortFn   func(ctx context.Context, id int64, sortOrder float64) error
	deleteRecipeIngredientFn func(ctx context.Context, id int64) error

	listRecipeInstructionsFn  func(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error)
	createRecipeInstructionFn func(ctx context.Context, recipeID int64, groupName string, sortOrder float64, content string) (db.RecipeInstruction, error)
	updateRecipeInstructionFn func(ctx context.Context, id int64, content string, sortOrder float64) error
	deleteRecipeInstructionFn func(ctx context.Context, id int64) error
}

func (f *fakeStore) ListRecipes(ctx context.Context) ([]db.ListRecipesRow, error) {
	if f.listRecipesFn == nil {
		f.t.Fatal("unexpected call to ListRecipes")
	}
	return f.listRecipesFn(ctx)
}

func (f *fakeStore) GetRecipe(ctx context.Context, id int64) (db.Recipe, error) {
	if f.getRecipeFn == nil {
		f.t.Fatal("unexpected call to GetRecipe")
	}
	return f.getRecipeFn(ctx, id)
}

func (f *fakeStore) CreateRecipe(ctx context.Context, name, shortDescription string) (db.Recipe, error) {
	if f.createRecipeFn == nil {
		f.t.Fatal("unexpected call to CreateRecipe")
	}
	return f.createRecipeFn(ctx, name, shortDescription)
}

func (f *fakeStore) UpdateRecipe(ctx context.Context, id int64, name, shortDescription string) (db.Recipe, error) {
	if f.updateRecipeFn == nil {
		f.t.Fatal("unexpected call to UpdateRecipe")
	}
	return f.updateRecipeFn(ctx, id, name, shortDescription)
}

func (f *fakeStore) DeleteRecipe(ctx context.Context, id int64) error {
	if f.deleteRecipeFn == nil {
		f.t.Fatal("unexpected call to DeleteRecipe")
	}
	return f.deleteRecipeFn(ctx, id)
}

func (f *fakeStore) ListRecipeIngredients(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error) {
	if f.listRecipeIngredientsFn == nil {
		f.t.Fatal("unexpected call to ListRecipeIngredients")
	}
	return f.listRecipeIngredientsFn(ctx, recipeIDs)
}

func (f *fakeStore) CreateRecipeIngredient(ctx context.Context, recipeID int64, groupName string, sortOrder float64, rawText string) (db.RecipeIngredient, error) {
	if f.createRecipeIngredientFn == nil {
		f.t.Fatal("unexpected call to CreateRecipeIngredient")
	}
	return f.createRecipeIngredientFn(ctx, recipeID, groupName, sortOrder, rawText)
}

func (f *fakeStore) UpdateRecipeIngredientSortOrder(ctx context.Context, id int64, sortOrder float64) error {
	if f.updateIngredientSortFn == nil {
		f.t.Fatal("unexpected call to UpdateRecipeIngredientSortOrder")
	}
	return f.updateIngredientSortFn(ctx, id, sortOrder)
}

func (f *fakeStore) DeleteRecipeIngredient(ctx context.Context, id int64) error {
	if f.deleteRecipeIngredientFn == nil {
		f.t.Fatal("unexpected call to DeleteRecipeIngredient")
	}
	return f.deleteRecipeIngredientFn(ctx, id)
}

func (f *fakeStore) ListRecipeInstructions(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error) {
	if f.listRecipeInstructionsFn == nil {
		f.t.Fatal("unexpected call to ListRecipeInstructions")
	}
	return f.listRecipeInstructionsFn(ctx, recipeIDs)
}

func (f *fakeStore) CreateRecipeInstruction(ctx context.Context, recipeID int64, groupName string, sortOrder float64, content string) (db.RecipeInstruction, error) {
	if f.createRecipeInstructionFn == nil {
		f.t.Fatal("unexpected call to CreateRecipeInstruction")
	}
	return f.createRecipeInstructionFn(ctx, recipeID, groupName, sortOrder, content)
}

func (f *fakeStore) UpdateRecipeInstruction(ctx context.Context, id int64, content string, sortOrder float64) error {
	if f.updateRecipeInstructionFn == nil {
		f.t.Fatal("unexpected call to UpdateRecipeInstruction")
	}
	return f.updateRecipeInstructionFn(ctx, id, content, sortOrder)
}

func (f *fakeStore) DeleteRecipeInstruction(ctx context.Context, id int64) error {
	if f.deleteRecipeInstructionFn == nil {
		f.t.Fatal("unexpected call to DeleteRecipeInstruction")
	}
	return f.deleteRecipeInstructionFn(ctx, id)
}

func TestListRecipesHandler(t *testing.T) {
	store := &fakeStore{
		t: t,
		listRecipesFn: func(ctx context.Context) ([]db.ListRecipesRow, error) {
			return []db.ListRecipesRow{
				{ID: 1, Name: "Chili"},
				{ID: 2, Name: "Pancakes"},
			}, nil
		},
	}

	h := &Handler{Store: store}
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()

	h.ListRecipesHandler(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}

	var got []db.ListRecipesRow
	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}
	if len(got) != 2 {
		t.Fatalf("expected 2 recipes, got %d", len(got))
	}
}

func TestGetRecipeByIDHandler_NotFound(t *testing.T) {
	store := &fakeStore{
		t: t,
		getRecipeFn: func(ctx context.Context, id int64) (db.Recipe, error) {
			if id != 42 {
				t.Fatalf("expected id 42, got %d", id)
			}
			return db.Recipe{}, sql.ErrNoRows
		},
	}

	h := &Handler{Store: store}
	r := chi.NewRouter()
	r.Get("/{id}", h.GetRecipeByIDHandler)

	req := httptest.NewRequest(http.MethodGet, "/42", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("expected 404, got %d", rec.Code)
	}
}

func TestGetRecipeByIDHandler_Success(t *testing.T) {
	store := &fakeStore{
		t: t,
		getRecipeFn: func(ctx context.Context, id int64) (db.Recipe, error) {
			return db.Recipe{ID: 42, Name: "Chili"}, nil
		},
		listRecipeIngredientsFn: func(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error) {
			return []db.ListRecipeIngredientsRow{}, nil
		},
		listRecipeInstructionsFn: func(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error) {
			return []db.ListRecipeInstructionsRow{}, nil
		},
	}

	h := &Handler{Store: store}
	r := chi.NewRouter()
	r.Get("/{id}", h.GetRecipeByIDHandler)

	req := httptest.NewRequest(http.MethodGet, "/42", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestGetRecipeByIDHandler_InvalidID(t *testing.T) {
	store := &fakeStore{t: t}

	h := &Handler{Store: store}
	r := chi.NewRouter()
	r.Get("/{id}", h.GetRecipeByIDHandler)

	req := httptest.NewRequest(http.MethodGet, "/not-a-number", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestCreateRecipeHandler(t *testing.T) {
	store := &fakeStore{
		t: t,
		createRecipeFn: func(ctx context.Context, name, shortDescription string) (db.Recipe, error) {
			if name != "Chili" {
				t.Fatalf("expected name Chili, got %q", name)
			}
			return db.Recipe{ID: 1, Name: name}, nil
		},
	}

	h := &Handler{Store: store}
	body := bytes.NewBufferString(`{"name":"Chili"}`)
	req := httptest.NewRequest(http.MethodPost, "/", body)
	rec := httptest.NewRecorder()

	h.CreateRecipeHandler(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestCreateRecipeHandler_MissingName(t *testing.T) {
	store := &fakeStore{t: t}

	h := &Handler{Store: store}
	body := bytes.NewBufferString(`{"name":""}`)
	req := httptest.NewRequest(http.MethodPost, "/", body)
	rec := httptest.NewRecorder()

	h.CreateRecipeHandler(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestDeleteRecipeHandler(t *testing.T) {
	store := &fakeStore{
		t: t,
		deleteRecipeFn: func(ctx context.Context, id int64) error {
			if id != 7 {
				t.Fatalf("expected id 7, got %d", id)
			}
			return nil
		},
	}

	h := &Handler{Store: store}
	r := chi.NewRouter()
	r.Delete("/{id}", h.DeleteRecipeHandler)

	req := httptest.NewRequest(http.MethodDelete, "/7", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusNoContent {
		t.Fatalf("expected 204, got %d", rec.Code)
	}
}

func TestUpdateRecipeInstructionHandler(t *testing.T) {
	store := &fakeStore{
		t: t,
		updateRecipeInstructionFn: func(ctx context.Context, id int64, content string, sortOrder float64) error {
			if id != 9 || content != "Preheat oven" || sortOrder != 2 {
				t.Fatalf("unexpected args: id=%d content=%q sortOrder=%v", id, content, sortOrder)
			}
			return nil
		},
	}

	h := &Handler{Store: store}
	r := chi.NewRouter()
	r.Put("/{instructionID}", h.UpdateRecipeInstructionHandler)

	body := bytes.NewBufferString(`{"content":"Preheat oven","sort_order":2}`)
	req := httptest.NewRequest(http.MethodPut, "/9", body)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusNoContent {
		t.Fatalf("expected 204, got %d: %s", rec.Code, rec.Body.String())
	}
}
