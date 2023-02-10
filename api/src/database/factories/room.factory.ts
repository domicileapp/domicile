import { Room } from '@/rooms/room.entity'
import { Factory, Faker } from '@mikro-orm/seeder'

export class RoomFactory extends Factory<Room> {
  model = Room

  definition(faker: Faker): Partial<Room> {
    return {
      name: faker.random.word(),
    }
  }
}
