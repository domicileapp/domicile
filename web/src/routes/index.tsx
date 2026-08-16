import { createFileRoute } from '@tanstack/react-router'

import { useListRecipes } from '@/api/client/recipes/recipes'
import { RecipeGrid } from '@/components/recipes/recipes-grid'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: recipes, isLoading, error } = useListRecipes()

  return (
    <div>
      <RecipeGrid recipes={recipes?.data} isLoading={isLoading} error={error} />
    </div>
  )
}
