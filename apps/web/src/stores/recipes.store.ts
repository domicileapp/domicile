import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from './auth.store'
import { IRecipe } from '@domicile/contracts'

const authStore = useAuthStore()

export const useRecipesStore = defineStore({
  id: 'recipes',
  state: () => ({
    recipes: [] as IRecipe[],
    loading: true,
  }),
  actions: {
    async getAllRecipes() {
      try {
        this.loading = true
        const recipesData = await api.get('/recipes', {
          headers: {
            Authorization: `Bearer ${authStore.user.accessToken}`,
          },
        })
        this.recipes = recipesData.data
        console.log(recipesData.data)
        this.loading = false
      } catch (error) {
        console.error(error)
      }
    },
  },
})
