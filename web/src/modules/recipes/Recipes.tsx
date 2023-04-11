import { Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getAllRecipes } from './hooks/recipes.api'

export default function Recipes() {
  const { data } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getAllRecipes,
  })

  return (
    <div>
      <Grid container spacing={2} sx={{ px: 2 }}>
        <Grid item xs={12}>
          <Typography variant='h3'>Recipes</Typography>
        </Grid>
        <Grid item xs={12}>
          {data?.map((recipe) => (
            <li key={recipe.age}>{recipe.name}</li>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}
