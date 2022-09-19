import { Controller, Get, Req } from '@nestjs/common'
import { TaskService } from './task.service'

@Controller('todos')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @Get()
  // async findAll(@Req() req: any) {
  //   const tasks = await this.taskService.getAllTasks()
  //   return { tasks }
  // }
}
