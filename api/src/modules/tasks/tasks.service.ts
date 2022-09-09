import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTaskInput } from './dto/create-task.input'
import { UpdateTaskInput } from './dto/update-task.input'
import { Task } from './entities/task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const task = this.taskRepository.create(createTaskInput)
    return this.taskRepository.save(task)
  }

  findAll() {
    return `This action returns all tasks`
  }

  findOne(id: number) {
    return `This action returns a #${id} task`
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`
  }

  remove(id: number) {
    return `This action removes a #${id} task`
  }
}
