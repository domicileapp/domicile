import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, error, data } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/api/v1/recipes')
      return await response.json()
    },
  })

  if (isPending) {
    return 'Loading...'
  }

  if (error) {
    return `An error has occured: ${error.message}`
  }

  return (
    <div>
      {data.map((recipe) => (
        <h1 key={recipe.id}>{recipe.name}</h1>
      ))}
    </div>
  )
}
