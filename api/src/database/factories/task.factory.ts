import { Factory, Faker } from '@mikro-orm/seeder'
import { Task } from '../../tasks/task.entity'

export class TaskFactory extends Factory<Task> {
  model = Task

  definition(faker: Faker): Partial<Task> {
    return {
      title: faker.name.fullName(),
      description: faker.hacker.phrase(),
    }
  }
}
