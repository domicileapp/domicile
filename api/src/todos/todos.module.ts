import { MikroOrmModule } from '@mikro-orm/nestjs'
import { forwardRef, Module } from '@nestjs/common'
import { UsersModule } from 'src/users/users.module'
import { Todo } from './todo.entity'
import { TodosController } from './todos.controller'
import { TodosService } from './todos.service'

@Module({
  controllers: [TodosController],
  imports: [MikroOrmModule.forFeature([Todo]), forwardRef(() => UsersModule)],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
