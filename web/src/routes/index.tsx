import { createFileRoute } from '@tanstack/react-router'

import { useListRecipes } from '@/api/client/recipes/recipes'
import { RecipeGrid } from '@/components/recipes/recipes-grid'

type RecipesPageSearch = {
  page: number
  size: number
}

export const Route = createFileRoute('/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): RecipesPageSearch => {
    return {
      // TODO: Don't love that this shows in the URL always just because it'll
      // make the links a bit ugly, but a problem to solve later I suppose.
      page: Number(search.page ?? 1),
      size: Number(search.size ?? 12),
    }
  },
})

function RouteComponent() {
  const { page, size } = Route.useSearch()
  const navigate = Route.useNavigate()

  const {
    data: recipes,
    isLoading,
    error,
    failureReason,
  } = useListRecipes(undefined, { page, size })

  const handlePageChange = (page: number) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page,
      }),
    })
  }

  return (
    <div>
      <RecipeGrid
        totalRecipes={recipes && recipes.data.total_items}
        recipes={recipes?.data.items}
        isLoading={isLoading}
        error={failureReason?.response?.data.message || error?.response?.data.message || error}
        page={page}
        size={size}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
