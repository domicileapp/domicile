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
  return (
    <div>
      <Container fixed>
        <Paper sx={{ p: 3, m: 3 }} elevation={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h3'>Recipe List</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}
