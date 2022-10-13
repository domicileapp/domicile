import { Factory, Faker } from '@mikro-orm/seeder'
import { User } from '../../users/user.entity'
import * as bcrypt from 'bcrypt'

export class UserFactory extends Factory<User> {
  model = User

  definition(faker: Faker): Partial<User> {
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    return {
      firstName,
      lastName,
      username: faker.internet.userName(firstName, lastName),
      // password: faker.internet.password(),
    }
  }
}
