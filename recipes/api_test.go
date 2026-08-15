package recipes

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/go-chi/chi/v5"
	"github.com/stretchr/testify/mock"
)

func TestListRecipesHandler(t *testing.T) {
	mockDB := db.NewMockQuerier(t)
	mockDB.EXPECT().
		ListRecipes(mock.Anything).
		Return([]db.ListRecipesRow{
			{ID: 1, Name: "Chili"},
			{ID: 2, Name: "Pancakes"},
		}, nil)

	h := &Handler{DB: mockDB}
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
	mockDB := db.NewMockQuerier(t)
	mockDB.EXPECT().
		GetRecipe(mock.Anything, int64(42)).
		Return(db.Recipe{}, sql.ErrNoRows)

	h := &Handler{DB: mockDB}
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
	mockDB := db.NewMockQuerier(t)
	mockDB.EXPECT().
		GetRecipe(mock.Anything, int64(42)).
		Return(db.Recipe{ID: 42, Name: "Chili"}, nil)
	mockDB.EXPECT().
		ListRecipeIngredients(mock.Anything, []int64{42}).
		Return([]db.ListRecipeIngredientsRow{}, nil)
	mockDB.EXPECT().
		ListRecipeInstructions(mock.Anything, []int64{42}).
		Return([]db.ListRecipeInstructionsRow{}, nil)

	h := &Handler{DB: mockDB}
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
	mockDB := db.NewMockQuerier(t) // no .EXPECT() — fails if the DB is touched

	h := &Handler{DB: mockDB}
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
	mockDB := db.NewMockQuerier(t)
	mockDB.EXPECT().
		CreateRecipe(mock.Anything, mock.MatchedBy(func(p db.CreateRecipeParams) bool {
			return p.Name == "Chili"
		})).
		Return(db.Recipe{ID: 1, Name: "Chili"}, nil)

	h := &Handler{DB: mockDB}
	body := bytes.NewBufferString(`{"name":"Chili"}`)
	req := httptest.NewRequest(http.MethodPost, "/", body)
	rec := httptest.NewRecorder()

	h.CreateRecipeHandler(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestCreateRecipeHandler_MissingName(t *testing.T) {
	mockDB := db.NewMockQuerier(t)

	h := &Handler{DB: mockDB}
	body := bytes.NewBufferString(`{"name":""}`)
	req := httptest.NewRequest(http.MethodPost, "/", body)
	rec := httptest.NewRecorder()

	h.CreateRecipeHandler(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rec.Code)
	}
}

func TestDeleteRecipeHandler(t *testing.T) {
	mockDB := db.NewMockQuerier(t)
	mockDB.EXPECT().
		DeleteRecipe(mock.Anything, int64(7)).
		Return(nil)

	h := &Handler{DB: mockDB}
	r := chi.NewRouter()
	r.Delete("/{id}", h.DeleteRecipeHandler)

	req := httptest.NewRequest(http.MethodDelete, "/7", nil)
	rec := httptest.NewRecorder()
	r.ServeHTTP(rec, req)

	if rec.Code != http.StatusNoContent {
		t.Fatalf("expected 204, got %d", rec.Code)
	}
}
