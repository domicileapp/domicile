import { Factory, Faker } from '@mikro-orm/seeder';
import { List } from '@/lists/list.entity';
export declare class ListFactory extends Factory<List> {
    model: typeof List;
    definition(faker: Faker): Partial<List>;
}
