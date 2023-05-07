import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'info@patrickblackjr.com',
        password: 'P@ssw0rd',
        firstName: 'Patrick',
        lastName: 'Black',
      },
    ])
    await UserFactory.with('recipes', 3).createMany(3)
    // await CategoryFactory.with()
  }
}
