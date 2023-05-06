import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Recipe from 'App/Models/Recipe'
import CreateRecipeValidator from 'App/Validators/CreateRecipeValidator'

/**
 * @experimental
 */
export default class RecipesController {
  public async index({ request }: HttpContextContract) {
    const { filterBy, category } = request.qs()
    const page = request.input('page', 1)
    const limit = 10
    // const currentUser = await User.findBy('user_id', auth.user?.id ?? '')

    const recipes = await Recipe.query()
      .if(filterBy === 'category' && !!category, (query) =>
        query.whereHas('categories', (categoriesQuery) => categoriesQuery.where('value', category))
      )
      .preload('categories')
      .preload('createdBy')
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)

    if (filterBy) recipes.queryString({ filterBy })
    if (category) recipes.queryString({ filterBy, category })

    return recipes
  }

  public async view({ request }: HttpContextContract) {
    const recipe = await Recipe.findByOrFail('id', request.param('id'))
    await recipe.load((loader) => loader.load('categories').load('createdBy'))
    return recipe
  }

  public async create({ auth, request }: HttpContextContract) {
    const { categories, ...values } = await request.validate(CreateRecipeValidator)
    const recipe = await auth.user?.related('recipes').create(values)

    if (categories) {
      const relatedCategories = await Category.fetchOrCreateMany(
        'name',
        categories.split(',').map((name) => ({ name: name.trim() }))
      )
      await recipe?.related('categories').sync(relatedCategories.map(({ id }) => id))
    }

    return recipe
  }

  public async update({ auth, request }: HttpContextContract) {
    const recipe = await auth.user
      ?.related('recipes')
      .query()
      .where('id', request.param('id'))
      .first()
    if (!recipe) return
    const { categories, ...values } = await request.validate(CreateRecipeValidator)
    await recipe.merge(values).save()
    if (categories) {
      const relatedCategories = await Category.fetchOrCreateMany(
        'name',
        categories.split(',').map((name) => ({ name: name.trim() }))
      )
      await recipe.related('categories').sync(relatedCategories.map(({ id }) => id))
    }
    return recipe
  }

  public async delete({ auth, request }: HttpContextContract) {
    const recipe = await auth.user
      ?.related('recipes')
      .query()
      .where('id', request.param('id'))
      .first()

    if (!recipe) return
    await recipe.delete()
    return recipe
  }
}
