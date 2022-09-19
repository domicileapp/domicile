import { User } from '@/users/user.entity'
import { UsersService } from '@/users/users.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTodoDto } from './dto/todo.create.dto'
import { Todo } from './entities/todo.entity'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    private readonly usersService: UsersService
  ) {}

  async getAllTodos(): Promise<Todo[]> {
    const todos = await this.todoRepo.find({ relations: ['tasks', 'owner'] })
    return todos
  }

  async getTodo(id: number): Promise<Todo> {
    const todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    })

    if (!todo) {
      throw new HttpException(
        `Todo list does not exist.`,
        HttpStatus.BAD_REQUEST
      )
    }

    return todo
  }

  async createTodo(email: string, createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description } = createTodoDto

    const owner = await this.usersService.findByEmail(email)

    const todo: Todo = await this.todoRepo.create({
      title,
      description,
      owner,
    })

    await this.todoRepo.save(todo)
    return todo
  }
  async deleteTodo(id: number): Promise<Todo> {
    const todo: Todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks', 'owner'],
    })

    if (!todo) {
      throw new HttpException(
        `Todo list does not exist.`,
        HttpStatus.BAD_REQUEST
      )
    }

    if (todo.tasks && todo.tasks.length > 0) {
      throw new HttpException(
        `Cannot delete this todo list, it has existing tasks`,
        HttpStatus.FORBIDDEN
      )
    }

    await this.todoRepo.delete({ id })
    return todo
  }
}
