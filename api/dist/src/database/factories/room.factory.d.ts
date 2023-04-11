import { Room } from '@/rooms/room.entity';
import { Factory, Faker } from '@mikro-orm/seeder';
export declare class RoomFactory extends Factory<Room> {
    model: typeof Room;
    definition(faker: Faker): Partial<Room>;
}
