import { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import { User } from '../src/users/user.entity'
import { ListFactory } from '../src/database/factories/list.factory'
import { TodoFactory } from '../src/database/factories/todo.factory'
import { UserFactory } from '../src/database/factories/user.factory'
import * as bcrypt from 'bcrypt'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashed = await bcrypt.hash('P@ssw0rd', 10)

    new TodoFactory(em)
      .each((todo) => {
        todo.createdBy = new UserFactory(em)
          .each((user) => {
            user.password = hashed
          })
          .makeOne()
        todo.list = new ListFactory(em)
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
