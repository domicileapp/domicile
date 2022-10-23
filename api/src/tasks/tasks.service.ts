import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'

interface FindAllArgs {
  relations?: string[]
  authorId?: number
}

interface FindOneArgs extends FindAllArgs {
  id: number
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: EntityRepository<Task>,
  ) {}

  async create(createdById: number, createTaskInput: CreateTaskDto) {
    const task = this.tasksRepository.create({
      createdBy: {
        id: createdById,
      },
      ...createTaskInput,
    })
    await this.tasksRepository.persistAndFlush(task)
    return task
  }

  findAll() {
    return this.tasksRepository.findAll({ populate: ['createdBy'] })
  }

  async findOne({ id }: FindOneArgs) {
    try {
      const task = this.tasksRepository.findOneOrFail(
        { id },
        { populate: ['createdBy'] },
      )
      return task
    } catch (e) {
      return new NotFoundError(`Not found`, Task)
    }
  }

  async update(id: number, updateTaskInput: UpdateTaskDto) {
    const post = await this.tasksRepository.findOne(id)
    this.tasksRepository.assign(post, updateTaskInput)
    await this.tasksRepository.flush()
    return post
  }

  async remove(id: number) {
    await this.tasksRepository.removeAndFlush({ id })
    return true
  }
}
