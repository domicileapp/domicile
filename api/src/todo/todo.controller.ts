import { User } from '@/users/user.entity'
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateTodoDto } from './dto/todo.create.dto'
import { Todo } from './entities/todo.entity'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@Req() req: any) {
    const todos = await this.todoService.getAllTodos()
    return todos
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Todo> {
    return await this.todoService.getTodo(id)
  }

  @Post()
  // @UseGuards(AuthGuard())
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: any
  ): Promise<Todo> {
    const user = req.email
    return await this.todoService.createTodo(user, createTodoDto)
  }
}
