package recipes

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/pkg/encode"
	"github.com/go-chi/chi/v5"
)

type Handler struct {
	DB *db.Queries
}

func Routes(queries *db.Queries) chi.Router {
	r := chi.NewRouter()
	h := &Handler{DB: queries}

	// Define specific recipe paths
	r.Get("/", h.ListRecipesHandler)
	r.Get("/{id}", h.GetRecipeByIDHandler)

	return r
}

func (h *Handler) ListRecipesHandler(w http.ResponseWriter, r *http.Request) {
	recipes, err := h.DB.ListRecipes(r.Context())
	if err != nil {
		http.Error(w, "Failed to retrieve recipes", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(recipes); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) GetRecipeByIDHandler(w http.ResponseWriter, r *http.Request) {
	recipeIDParam := chi.URLParam(r, "id")
	recipeID, err := strconv.ParseInt(recipeIDParam, 10, 64)
	if err != nil {
		http.Error(w, "Failed to retrieve recipe", http.StatusInternalServerError)
		log.Println(err.Error())
	}

	recipe, err := h.DB.GetRecipe(r.Context(), recipeID)
	if err != nil {
		http.Error(w, "No recipe found for ID", http.StatusNotFound)
		log.Println(err.Error())
		return
	}

	err = encode.ResponseJSON(w, 200, recipe)
	if err != nil {
		http.Error(w, "Failed to retrieve recipe", http.StatusInternalServerError)
		log.Println(err.Error())
	}
}
