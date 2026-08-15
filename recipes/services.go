package recipes

import (
	"context"

	"github.com/domicileapp/domicile/internal/db"
)

type RecipeStore interface {
	ListRecipes(ctx context.Context) ([]db.ListRecipesRow, error)
	GetRecipe(ctx context.Context, id int64) (db.Recipe, error)
	CreateRecipe(ctx context.Context, name, shortDescription string) (db.Recipe, error)
	UpdateRecipe(ctx context.Context, id int64, name, shortDescription string) (db.Recipe, error)
	DeleteRecipe(ctx context.Context, id int64) error

	ListRecipeIngredients(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error)
	CreateRecipeIngredient(ctx context.Context, recipeID int64, groupName string, sortOrder float64, rawText string) (db.RecipeIngredient, error)
	UpdateRecipeIngredientSortOrder(ctx context.Context, id int64, sortOrder float64) error
	DeleteRecipeIngredient(ctx context.Context, id int64) error

	ListRecipeInstructions(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error)
	CreateRecipeInstruction(ctx context.Context, recipeID int64, groupName string, sortOrder float64, content string) (db.RecipeInstruction, error)
	UpdateRecipeInstruction(ctx context.Context, id int64, content string, sortOrder float64) error
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

func (s *sqlcStore) CreateRecipe(ctx context.Context, name, shortDescription string) (db.Recipe, error) {
	return s.q.CreateRecipe(ctx, db.CreateRecipeParams{
		Name:             name,
		ShortDescription: &shortDescription,
	})
}

func (s *sqlcStore) UpdateRecipe(ctx context.Context, id int64, name, shortDescription string) (db.Recipe, error) {
	return s.q.UpdateRecipe(ctx, db.UpdateRecipeParams{
		ID:               id,
		Name:             name,
		ShortDescription: &shortDescription,
	})
}

func (s *sqlcStore) DeleteRecipe(ctx context.Context, id int64) error {
	return s.q.DeleteRecipe(ctx, id)
}

func (s *sqlcStore) ListRecipeIngredients(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error) {
	return s.q.ListRecipeIngredients(ctx, recipeIDs)
}

func (s *sqlcStore) CreateRecipeIngredient(ctx context.Context, recipeID int64, groupName string, sortOrder float64, rawText string) (db.RecipeIngredient, error) {
	return s.q.CreateRecipeIngredient(ctx, db.CreateRecipeIngredientParams{
		RecipeID:  recipeID,
		GroupName: &groupName,
		SortOrder: sortOrder,
		RawText:   rawText,
	})
}

func (s *sqlcStore) UpdateRecipeIngredientSortOrder(ctx context.Context, id int64, sortOrder float64) error {
	return s.q.UpdateRecipeIngredientSortOrder(ctx, db.UpdateRecipeIngredientSortOrderParams{
		ID:        id,
		SortOrder: sortOrder,
	})
}

func (s *sqlcStore) DeleteRecipeIngredient(ctx context.Context, id int64) error {
	return s.q.DeleteRecipeIngredient(ctx, id)
}

func (s *sqlcStore) ListRecipeInstructions(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error) {
	return s.q.ListRecipeInstructions(ctx, recipeIDs)
}

func (s *sqlcStore) CreateRecipeInstruction(ctx context.Context, recipeID int64, groupName string, sortOrder float64, content string) (db.RecipeInstruction, error) {
	return s.q.CreateRecipeInstruction(ctx, db.CreateRecipeInstructionParams{
		RecipeID:  recipeID,
		GroupName: &groupName,
		SortOrder: sortOrder,
		Content:   content,
	})
}

func (s *sqlcStore) UpdateRecipeInstruction(ctx context.Context, id int64, content string, sortOrder float64) error {
	if err := s.q.UpdateRecipeInstructionContent(ctx, db.UpdateRecipeInstructionContentParams{
		ID:      id,
		Content: content,
	}); err != nil {
		return err
	}
	return s.q.UpdateRecipeInstructionSortOrder(ctx, db.UpdateRecipeInstructionSortOrderParams{
		ID:        id,
		SortOrder: sortOrder,
	})
}

func (s *sqlcStore) DeleteRecipeInstruction(ctx context.Context, id int64) error {
	return s.q.DeleteRecipeInstruction(ctx, id)
}
