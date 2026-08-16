package recipes

import (
	"context"

	"github.com/domicileapp/domicile/internal/db"
)

type RecipeStore interface {
	ListRecipes(ctx context.Context) ([]db.ListRecipesRow, error)
	GetRecipe(ctx context.Context, id int64) (db.Recipe, error)
	CreateRecipe(ctx context.Context, params createRecipeRequest) (db.Recipe, error)
	UpdateRecipe(ctx context.Context, id int64, params updateRecipeRequest) (db.Recipe, error)
	DeleteRecipe(ctx context.Context, id int64) error

	ListRecipeIngredients(ctx context.Context, recipeIds []int64) ([]db.ListRecipeIngredientsRow, error)
	CreateRecipeIngredient(ctx context.Context, recipeId int64, params createIngredientRequest) (db.RecipeIngredient, error)
	UpdateRecipeIngredient(ctx context.Context, id int64, params updateIngredientRequest) error
	DeleteRecipeIngredient(ctx context.Context, id int64) error

	ListRecipeInstructions(ctx context.Context, recipeIds []int64) ([]db.ListRecipeInstructionsRow, error)
	CreateRecipeInstruction(ctx context.Context, recipeId int64, params createInstructionRequest) (db.RecipeInstruction, error)
	UpdateRecipeInstruction(ctx context.Context, id int64, params updateInstructionRequest) error
	DeleteRecipeInstruction(ctx context.Context, id int64) error
}

type Handler struct {
	Store RecipeStore
}

type sqlcStore struct {
	q *db.Queries
}

func NewSQLCStore(q *db.Queries) RecipeStore { return &sqlcStore{q: q} }

func (s *sqlcStore) ListRecipes(ctx context.Context) ([]db.ListRecipesRow, error) {
	return s.q.ListRecipes(ctx)
}

func (s *sqlcStore) GetRecipe(ctx context.Context, id int64) (db.Recipe, error) {
	return s.q.GetRecipe(ctx, id)
}

func (s *sqlcStore) CreateRecipe(ctx context.Context, params createRecipeRequest) (db.Recipe, error) {
	return s.q.CreateRecipe(ctx, db.CreateRecipeParams{
		Name:             params.Name,
		ShortDescription: &params.ShortDescription,
		PhotoUrl:         &params.PhotoUrl,
	})
}

func (s *sqlcStore) UpdateRecipe(ctx context.Context, id int64, params updateRecipeRequest) (db.Recipe, error) {
	return s.q.UpdateRecipe(ctx, db.UpdateRecipeParams{
		ID:               id,
		Name:             params.Name,
		ShortDescription: &params.ShortDescription,
	})
}

func (s *sqlcStore) DeleteRecipe(ctx context.Context, id int64) error {
	return s.q.DeleteRecipe(ctx, id)
}

func (s *sqlcStore) ListRecipeIngredients(ctx context.Context, recipeIds []int64) ([]db.ListRecipeIngredientsRow, error) {
	return s.q.ListRecipeIngredients(ctx, recipeIds)
}

func (s *sqlcStore) CreateRecipeIngredient(ctx context.Context, recipeId int64, params createIngredientRequest) (db.RecipeIngredient, error) {
	return s.q.CreateRecipeIngredient(ctx, db.CreateRecipeIngredientParams{
		RecipeID:  recipeId,
		GroupName: &params.GroupName,
		SortOrder: params.SortOrder,
		RawText:   params.RawText,
	})
}

func (s *sqlcStore) UpdateRecipeIngredient(ctx context.Context, id int64, params updateIngredientRequest) error {
	return s.q.UpdateRecipeIngredient(ctx, db.UpdateRecipeIngredientParams{
		ID:        id,
		GroupName: &params.GroupName,
		SortOrder: params.SortOrder,
		RawText:   params.RawText,
	})
}

func (s *sqlcStore) DeleteRecipeIngredient(ctx context.Context, id int64) error {
	return s.q.DeleteRecipeIngredient(ctx, id)
}

func (s *sqlcStore) ListRecipeInstructions(ctx context.Context, recipeIds []int64) ([]db.ListRecipeInstructionsRow, error) {
	return s.q.ListRecipeInstructions(ctx, recipeIds)
}

func (s *sqlcStore) CreateRecipeInstruction(ctx context.Context, recipeId int64, params createInstructionRequest) (db.RecipeInstruction, error) {
	return s.q.CreateRecipeInstruction(ctx, db.CreateRecipeInstructionParams{
		RecipeID:  recipeId,
		GroupName: &params.GroupName,
		SortOrder: params.SortOrder,
		Content:   params.Content,
	})
}

func (s *sqlcStore) UpdateRecipeInstruction(ctx context.Context, id int64, params updateInstructionRequest) error {
	if err := s.q.UpdateRecipeInstruction(ctx, db.UpdateRecipeInstructionParams{
		ID:        id,
		Content:   params.Content,
		SortOrder: params.SortOrder,
	}); err != nil {
		return err
	}
	return s.q.UpdateRecipeInstruction(ctx, db.UpdateRecipeInstructionParams{
		ID:        id,
		SortOrder: params.SortOrder,
		Content:   params.Content,
	})
}

func (s *sqlcStore) DeleteRecipeInstruction(ctx context.Context, id int64) error {
	return s.q.DeleteRecipeInstruction(ctx, id)
}
