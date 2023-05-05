import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10

    const users = await User.query().paginate(page, limit)

    return users
  }

  public async create({ auth, request }: HttpContextContract) {
    const { email, password, firstName, lastName } = await request.validate(CreateUserValidator)
    const user = await User.create({ email, password, firstName, lastName })
    await auth.login(user)
    return user
  }
}
