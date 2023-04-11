import { Factory, Faker } from '@mikro-orm/seeder';
import { User } from '@/users/user.entity';
export declare class UserFactory extends Factory<User> {
    model: typeof User;
    definition(faker: Faker): Partial<User>;
}
