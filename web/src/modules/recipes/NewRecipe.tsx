import { Save } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useState } from 'react'

export default function Recipes() {
  const [title, setTitle] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [servingSize, setServingSize] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [directions, setDirections] = useState('')
  const [loading, setLoading] = useState(false)
  return (
    <div>
      <Container fixed>
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
              <TextField fullWidth variant='filled' label='Serving Size' />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant='filled'
                label='Ingredients'
                multiline
                helperText="Press 'Enter' to add new lines"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant='filled'
                label='Directions'
                multiline
                helperText="Press 'Enter' to add new lines"
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                loading={loading}
                sx={{ float: 'right' }}
                color='primary'
                variant='contained'
              >
                Create
              </LoadingButton>
              <Button sx={{ float: 'right', mr: 1 }} color='inherit' variant='text'>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}
