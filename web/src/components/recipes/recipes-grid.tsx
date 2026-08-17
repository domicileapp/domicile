import { Grid } from '@mantine/core'

import type { GithubComDomicileappDomicileInternalDbRecipe } from '@/api/schemas'

import { ErrorCard } from '../ui/error-card'
import { RecipeCard } from './recipe-card'
import { RecipesGridLoader } from './recipes-grid-loader'

interface RecipeGridProps {
  recipes?: GithubComDomicileappDomicileInternalDbRecipe[]
  error: unknown | Error
  isLoading: boolean
}

export function RecipeGrid(props: RecipeGridProps) {
  if (props.error) {
    return <ErrorCard error={props.error} title="Unable to load recipes" />
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
