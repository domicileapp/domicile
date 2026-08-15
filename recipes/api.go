package recipes

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	_ "github.com/domicileapp/domicile/docs"
	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/pkg/encode"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type Handler struct {
	DB db.Querier
}

func Routes(queries *db.Queries) chi.Router {
	r := chi.NewRouter()
	h := &Handler{DB: queries}

	r.Get("/", h.ListRecipesHandler)
	r.Post("/", h.CreateRecipeHandler)
	r.Get("/{id}", h.GetRecipeByIDHandler)
	r.Put("/{id}", h.UpdateRecipeHandler)
	r.Delete("/{id}", h.DeleteRecipeHandler)

	r.Post("/{id}/ingredients", h.CreateRecipeIngredientHandler)
	r.Put("/{id}/ingredients/{ingredientID}", h.UpdateRecipeIngredientHandler)
	r.Delete("/{id}/ingredients/{ingredientID}", h.DeleteRecipeIngredientHandler)

	r.Post("/{id}/instructions", h.CreateRecipeInstructionHandler)
	r.Put("/{id}/instructions/{instructionID}", h.UpdateRecipeInstructionHandler)
	r.Delete("/{id}/instructions/{instructionID}", h.DeleteRecipeInstructionHandler)

	return r
}

// ListRecipesHandler godoc
//
//	@Summary		List recipes
//	@Tags			recipes
//	@Description	Get list of all recipes
//	@Accept			json
//	@Produce		json
//	@Success		200	{array}	db.Recipe
//	@Router			/api/v1/recipes [get]
func (h *Handler) ListRecipesHandler(w http.ResponseWriter, r *http.Request) {
	recipes, err := h.DB.ListRecipes(r.Context())
	if err != nil {
		http.Error(w, "Failed to retrieve recipes", http.StatusInternalServerError)
		return
	}

	if err := encode.ResponseJSON(w, http.StatusOK, recipes); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

type RecipeResponse struct {
	db.Recipe
	Ingredients  []db.ListRecipeIngredientsRow  `json:"ingredients"`
	Instructions []db.ListRecipeInstructionsRow `json:"instructions"`
}

// GetRecipeByIDHandler godoc
//
//	@Summary	Get recipe by ID
//	@Tags		recipes
//	@Accept		json
//	@Produce	json
//	@Success	200	{object}	recipes.RecipeResponse
//	@Param		id	path		int	true	"Recipe ID"
//	@Router		/api/v1/recipes/{id} [get]
func (h *Handler) GetRecipeByIDHandler(w http.ResponseWriter, r *http.Request) {
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	recipe, err := h.DB.GetRecipe(r.Context(), recipeID)
	if err != nil {
		http.Error(w, "No recipe found for ID", http.StatusNotFound)
		log.Println(err.Error())
		return
	}

	ids := []int64{recipeID}

	ingredients, err := h.DB.ListRecipeIngredients(r.Context(), ids)
	if err != nil {
		http.Error(w, "Failed to retrieve ingredients", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	instructions, err := h.DB.ListRecipeInstructions(r.Context(), ids)
	if err != nil {
		http.Error(w, "Failed to retrieve instructions", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	resp := RecipeResponse{
		Recipe:       recipe,
		Ingredients:  ingredients,
		Instructions: instructions,
	}

	if err := encode.ResponseJSON(w, http.StatusOK, resp); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		log.Println(err.Error())
	}
}

type createRecipeRequest struct {
	Name             string `json:"name"`
	ShortDescription string `json:"short_description"`
}

// CreateRecipeHandler godoc
//
//	@Summary	Create recipe
//	@Tags		recipes
//	@Accept		json
//	@Produce	json
//	@Success	200		{object}	db.Recipe
//	@Param		message	body		createRecipeRequest	true	"Recipe data"
//	@Router		/api/v1/recipes [post]
func (h *Handler) CreateRecipeHandler(w http.ResponseWriter, r *http.Request) {
	var req createRecipeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	recipe, err := h.DB.CreateRecipe(r.Context(), db.CreateRecipeParams{
		Name:             req.Name,
		ShortDescription: &req.ShortDescription,
	})
	if err != nil {
		http.Error(w, "Failed to create recipe", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	if err := encode.ResponseJSON(w, http.StatusCreated, recipe); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

type updateRecipeRequest struct {
	Name             string `json:"name"`
	ShortDescription string `json:"short_description,omitempty"`
}

func (h *Handler) UpdateRecipeHandler(w http.ResponseWriter, r *http.Request) {
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	var req updateRecipeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	recipe, err := h.DB.UpdateRecipe(r.Context(), db.UpdateRecipeParams{
		ID:               recipeID,
		Name:             req.Name,
		ShortDescription: &req.ShortDescription,
	})
	if err != nil {
		http.Error(w, "Failed to update recipe", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	if err := encode.ResponseJSON(w, http.StatusOK, recipe); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *Handler) DeleteRecipeHandler(w http.ResponseWriter, r *http.Request) {
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	if err := h.DB.DeleteRecipe(r.Context(), recipeID); err != nil {
		http.Error(w, "Failed to delete recipe", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

type createIngredientRequest struct {
	GroupName string  `json:"group_name"`
	SortOrder float64 `json:"sort_order"`
	RawText   string  `json:"raw_text"`
}

func (h *Handler) CreateRecipeIngredientHandler(w http.ResponseWriter, r *http.Request) {
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	var req createIngredientRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.RawText == "" {
		http.Error(w, "raw_text is required", http.StatusBadRequest)
		return
	}

	ingredient, err := h.DB.CreateRecipeIngredient(r.Context(), db.CreateRecipeIngredientParams{
		RecipeID:  recipeID,
		GroupName: &req.GroupName,
		SortOrder: req.SortOrder,
		RawText:   req.RawText,
	})
	if err != nil {
		http.Error(w, "Failed to create ingredient", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	if err := encode.ResponseJSON(w, http.StatusCreated, ingredient); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

type updateIngredientRequest struct {
	RawText   string  `json:"raw_text"`
	SortOrder float64 `json:"sort_order"`
}

func (h *Handler) UpdateRecipeIngredientHandler(w http.ResponseWriter, r *http.Request) {
	ingredientID, err := parseIDParam(r, "ingredientID")
	if err != nil {
		http.Error(w, "Invalid ingredient ID", http.StatusBadRequest)
		return
	}

	var req updateIngredientRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.DB.UpdateRecipeIngredientSortOrder(r.Context(), db.UpdateRecipeIngredientSortOrderParams{
		ID:        ingredientID,
		SortOrder: req.SortOrder,
	}); err != nil {
		http.Error(w, "Failed to update ingredient", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) DeleteRecipeIngredientHandler(w http.ResponseWriter, r *http.Request) {
	ingredientID, err := parseIDParam(r, "ingredientID")
	if err != nil {
		http.Error(w, "Invalid ingredient ID", http.StatusBadRequest)
		return
	}

	if err := h.DB.DeleteRecipeIngredient(r.Context(), ingredientID); err != nil {
		http.Error(w, "Failed to delete ingredient", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

type createInstructionRequest struct {
	GroupName string  `json:"group_name"`
	SortOrder float64 `json:"sort_order"`
	Content   string  `json:"content"`
}

func (h *Handler) CreateRecipeInstructionHandler(w http.ResponseWriter, r *http.Request) {
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	var req createInstructionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.Content == "" {
		http.Error(w, "content is required", http.StatusBadRequest)
		return
	}

	instruction, err := h.DB.CreateRecipeInstruction(r.Context(), db.CreateRecipeInstructionParams{
		RecipeID:  recipeID,
		GroupName: &req.GroupName,
		SortOrder: req.SortOrder,
		Content:   req.Content,
	})
	if err != nil {
		http.Error(w, "Failed to create instruction", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	if err := encode.ResponseJSON(w, http.StatusCreated, instruction); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

type updateInstructionRequest struct {
	Content   string  `json:"content"`
	SortOrder float64 `json:"sort_order"`
}

func (h *Handler) UpdateRecipeInstructionHandler(w http.ResponseWriter, r *http.Request) {
	instructionID, err := parseIDParam(r, "instructionID")
	if err != nil {
		http.Error(w, "Invalid instruction ID", http.StatusBadRequest)
		return
	}

	var req updateInstructionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.DB.UpdateRecipeInstructionContent(r.Context(), db.UpdateRecipeInstructionContentParams{
		ID:      instructionID,
		Content: req.Content,
	}); err != nil {
		http.Error(w, "Failed to update instruction content", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	if err := h.DB.UpdateRecipeInstructionSortOrder(r.Context(), db.UpdateRecipeInstructionSortOrderParams{
		ID:        instructionID,
		SortOrder: req.SortOrder,
	}); err != nil {
		http.Error(w, "Failed to update instruction order", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func (h *Handler) DeleteRecipeInstructionHandler(w http.ResponseWriter, r *http.Request) {
	instructionID, err := parseIDParam(r, "instructionID")
	if err != nil {
		http.Error(w, "Invalid instruction ID", http.StatusBadRequest)
		return
	}

	if err := h.DB.DeleteRecipeInstruction(r.Context(), instructionID); err != nil {
		http.Error(w, "Failed to delete instruction", http.StatusInternalServerError)
		log.Println(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func parseIDParam(r *http.Request, key string) (int64, error) {
	return strconv.ParseInt(chi.URLParam(r, key), 10, 64)
}

func toNullString(s string) pgtype.Text {
	if s == "" {
		return pgtype.Text{}
	}
	return pgtype.Text{String: s, Valid: true}
}
