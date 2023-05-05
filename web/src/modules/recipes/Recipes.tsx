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
        {recipes?.map((recipe: any) => (
          <Grid item xs={6}>
            <Card key={recipe.id}>
              <CardContent>
                <Typography gutterBottom variant='h5'>
                  {recipe.title}
                </Typography>
                <Typography variant='body2'>{recipe.ingredients}</Typography>
              </CardContent>
              <CardActions>
                <Button href={`/recipes/${recipe.id}`} startIcon={<Visibility />} size='small'>
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
