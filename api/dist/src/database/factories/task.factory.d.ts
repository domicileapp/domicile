import { Factory, Faker } from '@mikro-orm/seeder';
import { Task } from '@/tasks/task.entity';
export declare class TaskFactory extends Factory<Task> {
    model: typeof Task;
    definition(faker: Faker): Partial<Task>;
}
