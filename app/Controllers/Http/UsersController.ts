import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Schema from '@ioc:Adonis/Lucid/Schema'
import User from 'App/Models/User'

export default class UsersController {
  public async register({ request, auth, response }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })

    const user = new User()
    user.email = userDetails.email
    user.password = userDetails.password
    await user.save()
    await auth.login(user)
  }

  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
