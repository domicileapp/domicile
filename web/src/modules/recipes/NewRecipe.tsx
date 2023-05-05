import { LoadingButton } from '@mui/lab'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRecipe } from './hooks/recipes.api'

export default function Recipes() {
  const [title, setTitle] = useState()
  const [prepTime, setPrepTime] = useState()
  const [cookTime, setCookTime] = useState()
  const [servingSize, setServingSize] = useState()
  const [ingredients, setIngredients] = useState()
  const [directions, setDirections] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createRecipe,
    onMutate: () => {
      setLoading(true)
    },
    onError: () => {
      setLoading(false)
    },
    onSuccess: () => {
      navigate('/recipes')
    },
  })

  const onCreateRecipe = async (e: any) => {
    e.preventDefault()
    /**
     * @todo fix whatever typing issues are going on here
     */
    mutation.mutate({
      title: title,
      prepTime: prepTime || undefined,
      cookTime: cookTime || undefined,
      servingSize: servingSize || undefined,
      ingredients: ingredients,
      directions: directions,
    })
  }

  return (
    <div>
      <Paper sx={{ p: 3, m: 3 }} elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h3'>Create new recipe</Typography>
            <Typography variant='h6'>{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant='filled'
              label='Title'
              value={title}
              onChange={(v) => setTitle(v.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant='filled'
              label='Prep Time'
              value={prepTime}
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
              value={cookTime}
              onChange={(v) => setCookTime(v.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              variant='filled'
              label='Serving Size'
              value={servingSize}
              onChange={(v) => setServingSize(v.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant='filled'
              label='Ingredients'
              multiline
              value={ingredients}
              helperText="Press 'Enter' to add new lines"
              onChange={(v) => setIngredients(v.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant='filled'
              label='Directions'
              value={directions}
              multiline
              helperText="Press 'Enter' to add new lines"
              onChange={(v) => setDirections(v.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              sx={{ float: 'right' }}
              color='primary'
              variant='contained'
              onClick={onCreateRecipe}
            >
              Create
            </LoadingButton>
            <Button sx={{ float: 'right', mr: 1 }} color='inherit' variant='text' href='/recipes'>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
