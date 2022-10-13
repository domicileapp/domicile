import { Factory, Faker } from '@mikro-orm/seeder'
import { List } from '../../lists/list.entity'

export class ListFactory extends Factory<List> {
  model = List

  definition(faker: Faker): Partial<List> {
    return {
      title: faker.name.fullName(),
      description: faker.hacker.phrase(),
    }
  }
}
