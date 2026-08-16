import { Alert, Grid } from '@mantine/core'

import type { GithubComDomicileappDomicileInternalDbRecipe } from '@/api/schemas'

import { RecipeCard } from './recipe-card'
import { RecipesGridLoader } from './recipes-grid-loader'

interface RecipeGridProps {
  recipes?: GithubComDomicileappDomicileInternalDbRecipe[]
  error: unknown
  isLoading: boolean
}

export function RecipeGrid(props: RecipeGridProps) {
  if (props.error) {
    const message =
      props.error instanceof Error
        ? props.error.message
        : 'An unknown error occured. Check API logs.'
    return (
      <Grid>
        <Grid.Col span={12}>
          <Alert variant="light" color="red" title="Error loading recipes">
            {message}
          </Alert>
        </Grid.Col>
      </Grid>
    )
  }

  if (props.isLoading) {
    return (
      <Grid>
        <RecipesGridLoader />
      </Grid>
    )
  }

  return (
    <Grid>
      {props.recipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Grid>
  )
}
