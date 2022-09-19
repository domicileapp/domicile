import { IsNotEmpty, IsOptional } from 'class-validator'
import { ManyToOne } from 'typeorm'
import { Todo } from '../entities/todo.entity'

export class CreateTodoDto {
  @IsNotEmpty()
  title: string

  @IsOptional()
  description?: string

  @ManyToOne((type) => Todo, (todo) => todo.tasks)
  todo?: Todo
}
