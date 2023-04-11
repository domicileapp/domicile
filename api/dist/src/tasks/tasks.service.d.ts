import { EntityRepository, NotFoundError } from '@mikro-orm/core';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
interface FindAllArgs {
    relations?: string[];
    authorId?: number;
}
interface FindOneArgs extends FindAllArgs {
    id: number;
}
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: EntityRepository<Task>);
    create(createdById: number, createTaskInput: CreateTaskDto): Promise<Task>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Task, "createdBy">[]>;
    findOne({ id }: FindOneArgs): Promise<import("@mikro-orm/core").Loaded<Task, "createdBy"> | NotFoundError<typeof Task>>;
    update(id: number, updateTaskInput: UpdateTaskDto): Promise<import("@mikro-orm/core").Loaded<Task, never>>;
    remove(id: number): Promise<boolean>;
}
export {};
