package db

import (
	"context"
	"database/sql"
	"testing"
	"time"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/stretchr/testify/require"
)

func createRandomRecipe(t *testing.T) Recipe {
	arg := CreateRecipeParams{
		Title:        gofakeit.Dinner(),
		Instructions: gofakeit.Sentence(10),
		Ingredients:  gofakeit.Sentence(10),
	}

	recipe, err := testQueries.CreateRecipe(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, recipe)
	require.NotZero(t, recipe.ID)
	require.NotZero(t, recipe.CreatedAt)
	require.Exactly(t, arg.Title, recipe.Title)
	require.Exactly(t, arg.Instructions, recipe.Instructions)
	require.Exactly(t, arg.Ingredients, recipe.Ingredients)

	return recipe
}

func TestCreateRecipe(t *testing.T) {
	createRandomRecipe(t)
}

func TestGetRecipe(t *testing.T) {
	recipe1 := createRandomRecipe(t)
	recipe2, err := testQueries.GetRecipe(context.Background(), recipe1.ID)

	require.NoError(t, err)
	require.NotEmpty(t, recipe2)

	require.Equal(t, recipe1.ID, recipe2.ID)
	require.Equal(t, recipe1.Title, recipe2.Title)
	require.Equal(t, recipe1.Instructions, recipe2.Instructions)
	require.Equal(t, recipe1.Ingredients, recipe2.Ingredients)
	require.WithinDuration(t, recipe1.CreatedAt, recipe2.CreatedAt, time.Second)
}

func TestUpdateRecipe(t *testing.T) {
	recipe1 := createRandomRecipe(t)
	arg := UpdateRecipeParams{
		ID:           recipe1.ID,
		Title:        gofakeit.Sentence(10),
		Ingredients:  gofakeit.Sentence(10),
		Instructions: gofakeit.Sentence(10),
	}

	recipe2, err := testQueries.UpdateRecipe(context.Background(), arg)

	require.NoError(t, err)
	require.NotEmpty(t, recipe2)
	require.Equal(t, recipe1.ID, recipe2.ID)
	require.Equal(t, arg.Title, recipe2.Title)
	require.Equal(t, arg.Ingredients, recipe2.Ingredients)
	require.Equal(t, arg.Instructions, recipe2.Instructions)
	require.WithinDuration(t, recipe1.CreatedAt, recipe2.CreatedAt, time.Second)
}

func TestDeleteRecipe(t *testing.T) {
	recipe1 := createRandomRecipe(t)
	err := testQueries.DeleteRecipe(context.Background(), recipe1.ID)

	require.NoError(t, err)

	recipe2, err := testQueries.GetRecipe(context.Background(), recipe1.ID)
	require.Error(t, err)
	require.EqualError(t, err, sql.ErrNoRows.Error())
	require.Empty(t, recipe2)
}

// func TestListRecipes(t *testing.T) {
// 	for i := 0; i < 10; i++ {
// 		createRandomRecipe(t)
// 	}

//     arg := List
// }
