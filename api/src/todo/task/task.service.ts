import { Todo } from '@/todo/entities/todo.entity'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskDto } from '../dto/task.create.dto'
import { Task } from '../entities/task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>
  ) {}

  async getTask(id: string): Promise<Task> {
    const task: Task = await this.taskRepo.findOne({ where: { id } })

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST)
    }

    return task
  }

  async getTasksByTodo(id: number): Promise<Task[]> {
    const tasks: Task[] = await this.taskRepo.find({
      where: { todo: { id } },
      relations: ['todo'],
    })

    return tasks
  }

  async createTask(todoId: number, taskDto: CreateTaskDto): Promise<Task> {
    const { title } = taskDto

    const todo: Todo = await this.todoRepo.findOne({
      where: { id: todoId },
      relations: ['tasks', 'owner'],
    })

    const task: Task = await this.taskRepo.create({
      title,
      todo,
    })

    await this.taskRepo.save(task)

    return task
  }

  async destoryTask(id: string): Promise<Task> {
    const task: Task = await this.taskRepo.findOne({ where: { id } })

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST)
    }

    await this.taskRepo.delete({ id })

    return task
  }
}
