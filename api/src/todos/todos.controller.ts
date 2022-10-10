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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorator/current-user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { User } from 'src/users/user.entity'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './todo.entity'
import { TodosService } from './todos.service'

@ApiTags('todos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Create todo' })
  create(@CurrentUser() user: User, @Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(user.id, createTodoDto)
  }

  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found todo record',
    type: Todo,
  })
  findOne(@Param('id') id: number) {
    return this.todosService.findOne({ id })
  }

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
