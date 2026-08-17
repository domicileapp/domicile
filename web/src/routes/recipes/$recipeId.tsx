import { Center, Loader } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

import { useGetRecipe } from '@/api/client/recipes/recipes'
import { RecipePage } from '@/components/recipes/recipe-page'
import { ErrorCard } from '@/components/ui/error-card'

export const Route = createFileRoute('/recipes/$recipeId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { recipeId } = Route.useParams()

  const { data: recipe, isLoading, error } = useGetRecipe(parseInt(recipeId, 10))

  if (error) {
    return <ErrorCard error={error} title="Unable to load recipe" />
  }

  if (isLoading) {
    return (
      <Center maw="100%" h="50dvh">
        <Loader color="violet" size="xl" type="dots" />
      </Center>
    )
  }

  if (recipe) {
    return <RecipePage recipe={recipe.data} />
  }
}
