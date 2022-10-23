import { MikroOrmModule } from '@mikro-orm/nestjs'
import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { Task } from './task.entity'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  controllers: [TasksController],
  imports: [MikroOrmModule.forFeature([Task]), forwardRef(() => UsersModule)],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
