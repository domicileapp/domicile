import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { getRecipes } from './hooks/recipes.api'
import { Visibility } from '@mui/icons-material'

export default function Recipes() {
  const { data: recipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })
  return (
    <Grid container sx={{ px: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>Recipes</Typography>
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
