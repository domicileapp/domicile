import { Factory, Faker } from '@mikro-orm/seeder'
import { Todo } from '../../todos/todo.entity'

export class TodoFactory extends Factory<Todo> {
  model = Todo

  definition(faker: Faker): Partial<Todo> {
    return {
      title: faker.name.fullName(),
      description: faker.hacker.phrase(),
    }
  }
}
