import { IBase } from './base.interface'

export interface IRecipe extends IBase {
  title: string
  prepTime?: number | string
  cookTime?: number | string
  servingSize?: number | string
  ingredients: string
  directions: string
}
