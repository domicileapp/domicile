import { AuthModule } from '@/auth/auth.module'
import { User } from '@/users/user.entity'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskController } from './task/task.controller'
import { Task } from './entities/task.entity'
import { TaskService } from './task/task.service'
import { TodoController } from './todo.controller'
import { Todo } from './entities/todo.entity'
import { TodoService } from './todo.service'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([Todo, Task, User]),
  ],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService],
})
export class TodoModule {}
