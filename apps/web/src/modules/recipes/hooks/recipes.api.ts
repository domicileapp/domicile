import { api } from '@/providers/Axios'

export async function getRecipes() {
  const recipes = await api.get('/recipes').then((res) => {
    return res.data
  })
  return recipes
}

export async function getRecipe(id: string | undefined) {
  const recipe = await api.get(`/recipes/${id}`).then((res) => {
    return res.data
  })
  return recipe
}
