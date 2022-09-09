import { forwardRef, Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksResolver } from './tasks.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './entities/task.entity'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Task]), forwardRef(() => UsersModule)],
  providers: [TasksResolver, TasksService],
  exports: [TasksResolver],
  controllers: [],
})
export class TasksModule {}
