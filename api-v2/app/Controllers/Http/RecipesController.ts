import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Recipe from 'App/Models/Recipe'
import CreateRecipeValidator from 'App/Validators/CreateRecipeValidator'

export default class RecipesController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    // const currentUser = await User.findBy('user_id', auth.user?.id ?? '')

    const recipes = await Recipe.query().orderBy('createdAt', 'desc').paginate(page, limit)
    return recipes
  }

  public async create({ auth, request }: HttpContextContract) {
    const { ...values } = await request.validate(CreateRecipeValidator)
    const recipe = await auth.user?.related('recipes').create(values)
    return recipe
  }
}
