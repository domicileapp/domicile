import { Center, Grid, Pagination } from '@mantine/core'

import type { GithubComDomicileappDomicileInternalDbListRecipesRow } from '@/api/schemas'

import { ErrorCard } from '../ui/error-card'
import { RecipeCard } from './recipe-card'
import { RecipesGridLoader } from './recipes-grid-loader'

interface RecipeGridProps {
  recipes?: GithubComDomicileappDomicileInternalDbListRecipesRow[]
  error: unknown | Error
  isLoading: boolean
  page: number
  size: number
  totalRecipes: number | undefined
  onPageChange: (page: number) => void
}

export function RecipeGrid(props: RecipeGridProps) {
  if (props.error) {
    return <ErrorCard error={props.error || props.error} title="Unable to load recipes" />
  }

  if (props.isLoading) {
    return (
      <Grid>
        <RecipesGridLoader />
      </Grid>
    )
  }

  const totalPages = Math.ceil((props.totalRecipes ?? 12) / props.size)

  return (
    <Grid>
      {props.recipes?.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <Grid.Col span={{ base: 12 }}>
        <Center>
          <Pagination
            total={totalPages}
            value={props.page}
            onChange={props.onPageChange}
            size="input-md"
          />
        </Center>
      </Grid.Col>
    </Grid>
  )
}
