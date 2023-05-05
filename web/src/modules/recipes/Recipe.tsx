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
      <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
        <Grid item xs={12}>
          <Typography variant='h3'>{recipe?.title}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h4'>Ingredients</Typography>
              <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
                {recipe?.ingredients}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={8} xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h4'>Directions</Typography>
              <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
                {recipe?.directions}
              </Typography>
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
