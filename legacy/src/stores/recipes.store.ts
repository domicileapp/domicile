import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { IRecipe } from '@domicile/contracts'

export const useRecipesStore = defineStore({
  id: 'recipes',
  state: () => ({
    recipes: null as IRecipe[] | null,
    loading: true,
  }),
  actions: {
    async getAllRecipes() {
      try {
        this.loading = true
        const recipesData = await api.get('/recipes')
        this.recipes = recipesData.data
        console.log(recipesData.data)
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
