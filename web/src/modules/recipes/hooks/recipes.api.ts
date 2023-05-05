import { api } from '@/providers/Axios'
import { IRecipe } from '@domicile/contracts'

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

export async function createRecipe(data: IRecipe) {
  const recipe = await api.post(`/recipes`, { ...data }).then((res) => {
    return res.data
  })
  return recipe
}

export async function updateRecipeFn(id: string, data: Partial<IRecipe>) {
  console.log(data)
  const recipe = await api.patch(`/recipes/${id}`, { ...data })
  return recipe
}
