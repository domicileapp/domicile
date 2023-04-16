import { IRecipe } from '@domicile/contracts'
import { Edit, Visibility } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'

export function RecipeCard({ id, title, ingredients }: Partial<IRecipe>) {
  return (
    <div>
      <Card key={id}>
        <CardContent>
          <Typography gutterBottom variant='h5'>
            {title}
          </Typography>
          <Typography variant='body2'>{ingredients}</Typography>
        </CardContent>
        <CardActions sx={{ float: 'right' }}>
          <Button href={`/recipes/${id}/edit`} startIcon={<Edit />} size='small'>
            Edit
          </Button>
          <Button href={`/recipes/${id}`} startIcon={<Visibility />} size='small'>
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
