import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { getRecipes } from './hooks/recipes.api'
import { Add, Visibility } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { RecipeCard } from './components/RecipeCard'
import { IRecipe } from '@domicile/contracts'

export default function Recipes() {
  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })
  const actions = [{ icon: <Add />, name: 'New', link: '/recipes/new' }]
  const navigate = useNavigate()
  return (
    <Grid container sx={{ px: 2 }}>
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item sm={8}>
          <Typography variant='h3'>Recipes</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button sx={{ float: 'right' }} startIcon={<Add />} size='large' href='/recipes/new'>
            New
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {recipes?.map((recipe: IRecipe) => (
          <Grid item xs={6}>
            <RecipeCard id={recipe.id} title={recipe.title} ingredients={recipe.ingredients} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
