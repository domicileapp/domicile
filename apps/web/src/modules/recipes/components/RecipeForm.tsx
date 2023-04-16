import { LoadingButton } from '@mui/lab'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { IRecipe } from '@domicile/contracts'

export default function RecipeForm({ onSubmit, initialValue }: any) {
  const [recipe, setRecipe] = useState({
    title: initialValue.title || '',
    directions: initialValue.directions || '',
    ingredients: initialValue.ingredients || '',
  })

  const handleChangeInput = (e: any) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(recipe)
    setRecipe({
      title: '',
      directions: '',
      ingredients: '',
    })
  }

  return (
    <div>
      <Paper sx={{ p: 3, m: 3 }} elevation={2}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant='filled'
                label='Title'
                value={recipe.title}
                onChange={handleChangeInput}
              />
            </Grid>
            {/* <Grid item xs={4}>
              <TextField
                fullWidth
                variant='filled'
                label='Prep Time'
                value={newRecipe?.prepTime}
                type='number'
                helperText='in minutes'
                onChange={(v) => setPrepTime(v.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant='filled'
                label='Cook Time'
                helperText='in minutes'
                type='number'
                value={newRecipe?.cookTime}
                onChange={(v) => setCookTime(v.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant='filled'
                label='Serving Size'
                value={newRecipe?.servingSize}
                onChange={(v) => setServingSize(v.target.value)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant='filled'
                label='Ingredients'
                multiline
                value={recipe?.ingredients}
                helperText="Press 'Enter' to add new lines"
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant='filled'
                label='Directions'
                value={recipe?.directions}
                multiline
                helperText="Press 'Enter' to add new lines"
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <LoadingButton
                loading={isLoading}
                sx={{ float: 'right' }}
                color='primary'
                variant='contained'
                onClick={onCreateRecipe}
              >
                Create
              </LoadingButton> */}
              <Button sx={{ float: 'right', mr: 1 }} color='inherit' variant='text' href='/recipes'>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}
