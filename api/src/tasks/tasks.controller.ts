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
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@ApiTags('tasks')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  create(@CurrentUser() user: User, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(user.id, createTaskDto)
  }

  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found task record',
    type: Task,
  })
  findOne(@Param('id') id: number) {
    return this.tasksService.findOne({ id })
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      await this.tasksService.findOne({ id: +id })
      return this.tasksService.update(+id, updateTaskDto)
    } catch (e) {
      throw new UnauthorizedException({
        message: `You aren't the creator of this task.`,
      })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.tasksService.findOne({ id: +id })
      return this.tasksService.remove(+id)
    } catch (e) {
      throw new UnauthorizedException({
        message: `You aren't the creator of this task.`,
      })
    }
  }
}
