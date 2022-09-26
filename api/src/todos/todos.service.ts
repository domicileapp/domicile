import { EntityRepository, NotFoundError } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './todo.entity'

interface FindAllArgs {
  relations?: string[]
  authorId?: number
}

interface FindOneArgs extends FindAllArgs {
  id: number
}

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: EntityRepository<Todo>,
  ) {}

  async create(createdById: number, createTodoInput: CreateTodoDto) {
    const todo = this.todosRepository.create({
      createdBy: {
        id: createdById,
      },
      ...createTodoInput,
    })
    await this.todosRepository.persistAndFlush(todo)
    return todo
  }

  findAll() {
    return this.todosRepository.findAll({ populate: ['createdBy'] })
  }

  async findOne({ id }: FindOneArgs) {
    try {
      const todo = this.todosRepository.findOneOrFail(
        { id },
        { populate: ['createdBy'] },
      )
      return todo
    } catch (e) {
      return new NotFoundError(`Not found`, Todo)
    }
  }

  async update(id: number, updateTodoInput: UpdateTodoDto) {
    const post = await this.todosRepository.findOne(id)
    this.todosRepository.assign(post, updateTodoInput)
    await this.todosRepository.flush()
    return post
  }

  async remove(id: number) {
    await this.todosRepository.removeAndFlush({ id })
    return true
  }
}
