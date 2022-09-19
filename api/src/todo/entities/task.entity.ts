import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Todo } from './todo.entity'

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @ManyToOne((type) => Todo, (todo) => todo.tasks)
  todo?: Todo
}
