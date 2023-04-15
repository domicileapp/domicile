import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { getRecipe } from './hooks/recipes.api'
import { useParams } from 'react-router-dom'

export default function Recipe() {
  const { id } = useParams()
  const { data: recipe } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipe(id),
  })
  return (
    <Grid container sx={{ px: 2 }}>
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <Typography variant='h3'>{recipe?.title}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ p: 'auto' }}>
          <Card sx={{ p: 'auto' }}>
            <CardContent>
              <Typography variant='h4'>Ingredients</Typography>
              <Typography variant='body2'>{recipe?.ingredients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography variant='h4'>Directions</Typography>
              <Typography variant='body2'>{recipe?.directions}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
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
                <Button href={`/recipes/${recipe.id}`} size='small'>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </Grid>
  )
}
