import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { CurrentUser } from 'src/auth/decorator/current-user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { User } from 'src/users/user.entity'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { TodosService } from './todos.service'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: User, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(user.id, createTodoDto)
  }

  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne({ id })
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    try {
      await this.todosService.findOne({ id: +id })
      return this.todosService.update(+id, updateTodoDto)
    } catch (e) {
      throw new UnauthorizedException({
        message: `You aren't the creator of this todo.`,
      })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.todosService.findOne({ id: +id })
      return this.todosService.remove(+id)
    } catch (e) {
      throw new UnauthorizedException({
        message: `You aren't the creator of this todo.`,
      })
    }
  }
}
