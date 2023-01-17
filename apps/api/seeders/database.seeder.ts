import { EntityManager } from '@mikro-orm/postgresql'
import { Seeder } from '@mikro-orm/seeder'
import { ListFactory } from '@/database/factories/list.factory'
import { TaskFactory } from '@/database/factories/task.factory'
import { UserFactory } from '@/database/factories/user.factory'
import { RoomFactory } from '@/database/factories/room.factory'
import * as bcrypt from 'bcrypt'
import { RecipeFactory } from '@/database/factories/recipe.factory'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashed = await bcrypt.hash('P@ssw0rd', 10)
    const user = new UserFactory(em)
      .each((user) => {
        user.password = hashed
      })
      .makeOne()

    new TaskFactory(em)
      .each((task) => {
        task.createdBy = user
        task.list = new ListFactory(em)
          .each((list) => {
            list.createdBy = user
          })
          .makeOne()
      })
      .make(5)

    new RoomFactory(em)
      .each((room) => {
        room.createdBy = user
      })
      .make(3)

    new RecipeFactory(em).make(3)
  }
}
