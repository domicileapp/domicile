import { IBase } from './base.interface'

export interface IRecipe extends IBase {
  title: string
  prepTime?: number
  cookTime?: number
  servingSize?: number
  ingredients?: string
  directions?: string
}
