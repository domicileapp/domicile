import { api } from '@/providers/Axios'

export async function getAllRecipes() {
  api.get('/recipes').then((res) => res.data)
}
