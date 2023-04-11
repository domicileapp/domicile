import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(user: User, createTaskDto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Task, "createdBy">[]>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<Task, "createdBy"> | import("@mikro-orm/core").NotFoundError<typeof Task>>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import("@mikro-orm/core").Loaded<Task, never>>;
    remove(id: string): Promise<boolean>;
}
