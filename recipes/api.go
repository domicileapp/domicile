package recipes

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	_ "github.com/domicileapp/domicile/docs"
	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/pkg/encode"
	"github.com/domicileapp/domicile/pkg/logger"
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5"
)

func Routes(store RecipeStore) chi.Router {
	r := chi.NewRouter()
	h := &Handler{Store: store}

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

type PaginatedResponse struct {
	TotalItems int64               `json:"total_items"`
	Page       int32               `json:"page"`
	Size       int32               `json:"size"`
	Items      []db.ListRecipesRow `json:"items"`
}

// ListRecipesHandler godoc
//
//	@Summary		List recipes
//	@Id				list-recipes
//	@Tags			recipes
//	@Description	Get list of all recipes
//	@Accept			json
//	@Produce		json
//	@Param			page	query	int	false	"Page number (default: 1)"
//	@Param			size	query	int	false	"Page size (default: 12)"
//	@Success		200		{array}	db.Recipe
//	@Router			/api/v1/recipes [get]
func (h *Handler) ListRecipesHandler(w http.ResponseWriter, r *http.Request) {
	page := parseIntParam(r, "page", 1)
	size := parseIntParam(r, "size", 12)
	offset := (page - 1) * size

	totalRecipes, err := h.Store.CountRecipes(r.Context())
	if err != nil {
		http.Error(w, "Failed to retrieve recipe count", http.StatusInternalServerError)
		return
	}

	recipes, err := h.Store.ListRecipes(r.Context(), size, offset)
	if err != nil {
		http.Error(w, "Failed to retrieve recipes", http.StatusInternalServerError)
		return
	}

	response := PaginatedResponse{
		TotalItems: totalRecipes,
		Page:       page,
		Size:       size,
		Items:      recipes,
	}

	if err := encode.ResponseJSON(w, http.StatusOK, response); err != nil {
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
//	@Id			get-recipe
//	@Tags		recipes
//	@Accept		json
//	@Produce	json
//	@Success	200	{object}	recipes.RecipeResponse
//	@Param		id	path		int	true	"Recipe ID"
//	@Router		/api/v1/recipes/{id} [get]
func (h *Handler) GetRecipeByIDHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	recipe, err := h.Store.GetRecipe(r.Context(), recipeID)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			http.Error(w, "No recipe found for ID", http.StatusNotFound)
		} else {
			http.Error(w, "Failed to retrieve recipe", http.StatusInternalServerError)
		}
		log.Error(err.Error())
		return
	}

	ids := []int64{recipeID}

	ingredients, err := h.Store.ListRecipeIngredients(r.Context(), ids)
	if err != nil {
		http.Error(w, "Failed to retrieve ingredients", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	instructions, err := h.Store.ListRecipeInstructions(r.Context(), ids)
	if err != nil {
		http.Error(w, "Failed to retrieve instructions", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	resp := RecipeResponse{
		Recipe:       recipe,
		Ingredients:  ingredients,
		Instructions: instructions,
	}

	if err := encode.ResponseJSON(w, http.StatusOK, resp); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		log.Error(err.Error())
	}
}

type createRecipeRequest struct {
	Name             string `json:"name"`
	ShortDescription string `json:"short_description"`
	PhotoUrl         string `json:"photo_url"`
}

// CreateRecipeHandler godoc
//
//	@Summary	Create recipe
//	@Id			create-recipe
//	@Tags		recipes
//	@Accept		json
//	@Produce	json
//	@Success	200		{object}	db.Recipe
//	@Param		message	body		createRecipeRequest	true	"Recipe data"
//	@Router		/api/v1/recipes [post]
func (h *Handler) CreateRecipeHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
	var req createRecipeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	if req.Name == "" {
		http.Error(w, "name is required", http.StatusBadRequest)
		return
	}

	recipe, err := h.Store.CreateRecipe(r.Context(), req)
	if err != nil {
		http.Error(w, "Failed to create recipe", http.StatusInternalServerError)
		log.Error(err.Error())
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

// UpdateRecipeHandler godoc
//
//	@Summary	Update recipe
//	@Id			update-recipe
//	@Tags		recipes
//	@Accept		json
//	@Produce	json
//	@Success	204		{object}	db.Recipe
//	@Param		id		path		int					true	"Recipe ID"
//	@Param		message	body		updateRecipeRequest	true	"Recipe data"
//	@Router		/api/v1/recipes/{id} [put]
func (h *Handler) UpdateRecipeHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
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

	recipe, err := h.Store.UpdateRecipe(r.Context(), recipeID, req)
	if err != nil {
		http.Error(w, "Failed to update recipe", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	if err := encode.ResponseJSON(w, http.StatusOK, recipe); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

// DeleteRecipeHandler godoc
//
//	@Summary	Delete recipe
//	@Id			delete-recipe
//	@Tags		recipes
//	@Accept		json
//	@Produce	json
//	@Success	204
//	@Param		id	path	int	true	"Recipe ID"
//	@Router		/api/v1/recipes/{id} [delete]
func (h *Handler) DeleteRecipeHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
	recipeID, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, "Invalid recipe ID", http.StatusBadRequest)
		return
	}

	if err := h.Store.DeleteRecipe(r.Context(), recipeID); err != nil {
		http.Error(w, "Failed to delete recipe", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

type createIngredientRequest struct {
	GroupName string  `json:"group_name"`
	SortOrder float64 `json:"sort_order"`
	RawText   string  `json:"raw_text"`
}

// CreateRecipeIngredientHandler godoc
//
//	@Summary	Create recipe ingredient
//	@Tags		recipes, ingredients
//	@Id			create-recipe-ingredient
//	@Accept		json
//	@Produce	json
//	@Success	201		{object}	db.RecipeIngredient
//	@Param		message	body		createIngredientRequest	true	"Ingredient data"
//	@Param		id		path		int						true	"Recipe ID"
//	@Router		/api/v1/recipes/{id}/ingredients [post]
func (h *Handler) CreateRecipeIngredientHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
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

	ingredient, err := h.Store.CreateRecipeIngredient(r.Context(), recipeID, req)
	if err != nil {
		http.Error(w, "Failed to create ingredient", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	if err := encode.ResponseJSON(w, http.StatusCreated, ingredient); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

type updateIngredientRequest struct {
	RawText   string  `json:"raw_text"`
	SortOrder float64 `json:"sort_order"`
	GroupName string  `json:"group_name"`
}

// UpdateRecipeIngredientHandler godoc
//
//	@Summary	Update recipe ingredient
//	@Id			update-recipe-ingredient
//	@Tags		recipes, ingredients
//	@Accept		json
//	@Produce	json
//	@Success	201		{object}	db.Recipe
//	@Param		message	body		updateIngredientRequest	true	"Ingredient data"
//	@Param		id		path		int						true	"Recipe ID"
//	@Router		/api/v1/recipes/{id}/ingredient [put]
func (h *Handler) UpdateRecipeIngredientHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
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

	if err := h.Store.UpdateRecipeIngredient(r.Context(), ingredientID, req); err != nil {
		http.Error(w, "Failed to update ingredient", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// DeleteRecipeIngredientHandler godoc
//
//	@Summary	Delete recipe ingredient
//	@Tags		recipes, ingredients
//	@Accept		json
//	@Produce	json
//	@Success	204	{object}	db.Recipe
//	@Param		id	path		int	true	"Recipe ID"
//	@Router		/api/v1/recipes/{id}/ingredient [delete]
func (h *Handler) DeleteRecipeIngredientHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
	ingredientID, err := parseIDParam(r, "ingredientID")
	if err != nil {
		http.Error(w, "Invalid ingredient ID", http.StatusBadRequest)
		return
	}

	if err := h.Store.DeleteRecipeIngredient(r.Context(), ingredientID); err != nil {
		http.Error(w, "Failed to delete ingredient", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

type createInstructionRequest struct {
	GroupName string  `json:"group_name"`
	SortOrder float64 `json:"sort_order"`
	Content   string  `json:"content"`
}

// CreateRecipeInstructionHandler godoc
//
//	@Summary	Create recipe instruction
//	@Id			create-recipe-instruction
//	@Tags		recipes, instructions
//	@Accept		json
//	@Produce	json
//	@Success	201		{object}	db.RecipeInstruction
//	@Param		message	body		createInstructionRequest	true	"Instruction data"
//	@Param		id		path		int							true	"Recipe ID"
//	@Router		/api/v1/recipes/{id}/instructions [post]
func (h *Handler) CreateRecipeInstructionHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
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

	instruction, err := h.Store.CreateRecipeInstruction(r.Context(), recipeID, req)
	if err != nil {
		http.Error(w, "Failed to create instruction", http.StatusInternalServerError)
		log.Error(err.Error())
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

// UpdateRecipeInstructionHandler godoc
//
//	@Summary	Update recipe instruction
//	@Id			update-recipe-instruction
//	@Tags		recipes, instructions
//	@Accept		json
//	@Produce	json
//	@Success	201		{object}	db.Recipe
//	@Param		message	body		updateInstructionRequest	true	"Instruction data"
//	@Param		id		path		int							true	"Recipe ID"
//	@Router		/api/v1/recipes/{id}/instruction [put]
func (h *Handler) UpdateRecipeInstructionHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
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

	if err := h.Store.UpdateRecipeInstruction(r.Context(), instructionID, req); err != nil {
		http.Error(w, "Failed to update instruction", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// DeleteRecipeInstructionHandler godoc
//
//	@Summary	Delete recipe instruction
//	@Id			delete-recipe-instruction
//	@Tags		recipes, instructions
//	@Accept		json
//	@Produce	json
//	@Success	204	{object}	db.Recipe
//	@Param		id	path		int	true	"Recipe ID"
//	@Router		/api/v1/recipes/{id}/instruction [delete]
func (h *Handler) DeleteRecipeInstructionHandler(w http.ResponseWriter, r *http.Request) {
	log, _ := logger.SetupLogging()
	instructionID, err := parseIDParam(r, "instructionID")
	if err != nil {
		http.Error(w, "Invalid instruction ID", http.StatusBadRequest)
		return
	}

	if err := h.Store.DeleteRecipeInstruction(r.Context(), instructionID); err != nil {
		http.Error(w, "Failed to delete instruction", http.StatusInternalServerError)
		log.Error(err.Error())
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func parseIDParam(r *http.Request, key string) (int64, error) {
	return strconv.ParseInt(chi.URLParam(r, key), 10, 64)
}

func parseIntParam(r *http.Request, key string, defaultVal int32) int32 {
	valStr := r.URL.Query().Get(key)
	if valStr == "" {
		return defaultVal
	}

	val, err := strconv.Atoi(valStr)
	if err != nil || val <= 0 {
		return defaultVal
	}

	return int32(val)
}
