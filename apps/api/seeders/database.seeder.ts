import { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import { User } from '../src/users/user.entity'
import { ListFactory } from '../src/database/factories/list.factory'
import { TaskFactory } from '../src/database/factories/task.factory'
import { UserFactory } from '../src/database/factories/user.factory'
import * as bcrypt from 'bcrypt'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashed = await bcrypt.hash('P@ssw0rd', 10)

    new TaskFactory(em)
      .each((task) => {
        task.createdBy = new UserFactory(em)
          .each((user) => {
            user.password = hashed
          })
          .makeOne()
        task.list = new ListFactory(em)
          .each((list) => {
            list.createdBy = new UserFactory(em)
              .each((user) => {
                user.password = hashed
              })
              .makeOne()
          })
          .makeOne()
      })
      .make(5)
  }
}
