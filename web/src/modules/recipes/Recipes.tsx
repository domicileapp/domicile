import { Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getRecipe, getRecipes } from './hooks/recipes.api'

export default function Recipes() {
  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })
  const recipeId = 2
  const { data: recipe } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipe(recipeId),
  })

  return (
    <div>
      <Grid container spacing={2} sx={{ px: 2 }}>
        <Grid item xs={12}>
          <Typography variant='h3'>Recipes</Typography>
        </Grid>
        <Grid item xs={12}>
          {recipes?.map((recipe: any) => (
            <li key={recipe.id}>{recipe.title}</li>
          ))}
        </Grid>
        <Grid item xs={12}>
          <li key={recipe?.id}>
            {recipe?.title} ({recipe?.id})
          </li>
        </Grid>
      </Grid>
    </div>
  )
}
