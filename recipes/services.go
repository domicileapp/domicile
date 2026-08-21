package recipes

import (
	"context"
	"fmt"

	"github.com/domicileapp/domicile/internal/db"
	"github.com/domicileapp/domicile/pkg/scraper"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

//go:generate go run github.com/matryer/moq@latest -out store_mock.go . RecipeStore
type RecipeStore interface {
	ListRecipes(ctx context.Context, limit int32, offset int32, search string, sort string, direction string) ([]db.ListRecipesRow, error)
	GetRecipe(ctx context.Context, id int64) (db.Recipe, error)
	CreateRecipe(ctx context.Context, params createRecipeRequest) (db.Recipe, error)
	UpdateRecipe(ctx context.Context, id int64, params updateRecipeRequest) (db.Recipe, error)
	DeleteRecipe(ctx context.Context, id int64) error
	CountRecipes(ctx context.Context, search string) (int64, error)

	ListRecipeIngredients(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error)
	CreateRecipeIngredient(ctx context.Context, recipeID int64, params createIngredientRequest) (db.RecipeIngredient, error)
	UpdateRecipeIngredient(ctx context.Context, id int64, params updateIngredientRequest) error
	DeleteRecipeIngredient(ctx context.Context, id int64) error

	ListRecipeInstructions(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error)
	CreateRecipeInstruction(ctx context.Context, recipeID int64, params createInstructionRequest) (db.RecipeInstruction, error)
	UpdateRecipeInstruction(ctx context.Context, id int64, params updateInstructionRequest) error
	DeleteRecipeInstruction(ctx context.Context, id int64) error

	CreateFullRecipe(ctx context.Context, params createFullRecipeRequest) (db.Recipe, []db.RecipeIngredient, []db.RecipeInstruction, error)
}

type Handler struct {
	Store   RecipeStore
	Scraper scraper.Scraper
}

type sqlcStore struct {
	q    *db.Queries
	pool *pgxpool.Pool
}

func NewSQLCStore(pool *pgxpool.Pool) RecipeStore {
	return &sqlcStore{q: db.New(pool), pool: pool}
}

func (s *sqlcStore) ListRecipes(ctx context.Context, limit int32, offset int32, search string, sort string, direction string) ([]db.ListRecipesRow, error) {
	return s.q.ListRecipes(ctx, db.ListRecipesParams{
		Limit:     limit,
		Offset:    offset,
		Search:    search,
		Sort:      sort,
		Direction: direction,
	})
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

func (s *sqlcStore) CountRecipes(ctx context.Context, search string) (int64, error) {
	return s.q.CountRecipes(ctx, search)
}

func (s *sqlcStore) ListRecipeIngredients(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeIngredientsRow, error) {
	return s.q.ListRecipeIngredients(ctx, recipeIDs)
}

func (s *sqlcStore) CreateRecipeIngredient(ctx context.Context, recipeID int64, params createIngredientRequest) (db.RecipeIngredient, error) {
	return s.q.CreateRecipeIngredient(ctx, db.CreateRecipeIngredientParams{
		RecipeID:  recipeID,
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

func (s *sqlcStore) ListRecipeInstructions(ctx context.Context, recipeIDs []int64) ([]db.ListRecipeInstructionsRow, error) {
	return s.q.ListRecipeInstructions(ctx, recipeIDs)
}

func (s *sqlcStore) CreateRecipeInstruction(ctx context.Context, recipeID int64, params createInstructionRequest) (db.RecipeInstruction, error) {
	return s.q.CreateRecipeInstruction(ctx, db.CreateRecipeInstructionParams{
		RecipeID:  recipeID,
		GroupName: &params.GroupName,
		SortOrder: params.SortOrder,
		Content:   params.Content,
	})
}

func (s *sqlcStore) UpdateRecipeInstruction(ctx context.Context, id int64, params updateInstructionRequest) error {
	return s.q.UpdateRecipeInstruction(ctx, db.UpdateRecipeInstructionParams{
		ID:        id,
		Content:   params.Content,
		SortOrder: params.SortOrder,
	})
}

func (s *sqlcStore) DeleteRecipeInstruction(ctx context.Context, id int64) error {
	return s.q.DeleteRecipeInstruction(ctx, id)
}

// createFullRecipeRequest is the input to RecipeStore.CreateFullRecipe.
// It carries everything needed to populate the recipe row plus its
// ingredients and instructions in a single transaction.
type createFullRecipeRequest struct {
	Name             string
	ShortDescription string
	PhotoURL         string
	Source           string
	Servings         string
	PrepTime         string
	CookTime         string
	Notes            string
	Nutrition        string

	Ingredients  []createIngredientRequest
	Instructions []createInstructionRequest
}

func (s *sqlcStore) CreateFullRecipe(ctx context.Context, params createFullRecipeRequest) (db.Recipe, []db.RecipeIngredient, []db.RecipeInstruction, error) {
	tx, err := s.pool.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return db.Recipe{}, nil, nil, fmt.Errorf("begin tx: %w", err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	q := s.q.WithTx(tx)

	recipe, err := q.CreateFullRecipe(ctx, db.CreateFullRecipeParams{
		Name:             params.Name,
		ShortDescription: optionalString(params.ShortDescription),
		PhotoUrl:         optionalString(params.PhotoURL),
		Source:           optionalString(params.Source),
		Servings:         optionalString(params.Servings),
		PrepTime:         optionalString(params.PrepTime),
		CookTime:         optionalString(params.CookTime),
		Notes:            optionalString(params.Notes),
		Nutrition:        optionalString(params.Nutrition),
	})
	if err != nil {
		return db.Recipe{}, nil, nil, fmt.Errorf("create recipe: %w", err)
	}

	ingredients := make([]db.RecipeIngredient, 0, len(params.Ingredients))
	for i, ing := range params.Ingredients {
		sortOrder := ing.SortOrder
		if sortOrder == 0 {
			sortOrder = float64(i + 1)
		}
		created, err := q.CreateRecipeIngredient(ctx, db.CreateRecipeIngredientParams{
			RecipeID:  recipe.ID,
			GroupName: optionalString(ing.GroupName),
			SortOrder: sortOrder,
			RawText:   ing.RawText,
		})
		if err != nil {
			return db.Recipe{}, nil, nil, fmt.Errorf("create ingredient %d: %w", i, err)
		}
		ingredients = append(ingredients, created)
	}

	instructions := make([]db.RecipeInstruction, 0, len(params.Instructions))
	for i, step := range params.Instructions {
		sortOrder := step.SortOrder
		if sortOrder == 0 {
			sortOrder = float64(i + 1)
		}
		created, err := q.CreateRecipeInstruction(ctx, db.CreateRecipeInstructionParams{
			RecipeID:  recipe.ID,
			GroupName: optionalString(step.GroupName),
			SortOrder: sortOrder,
			Content:   step.Content,
		})
		if err != nil {
			return db.Recipe{}, nil, nil, fmt.Errorf("create instruction %d: %w", i, err)
		}
		instructions = append(instructions, created)
	}

	if err := tx.Commit(ctx); err != nil {
		return db.Recipe{}, nil, nil, fmt.Errorf("commit tx: %w", err)
	}

	return recipe, ingredients, instructions, nil
}

func optionalString(s string) *string {
	if s == "" {
		return nil
	}
	return &s
}
