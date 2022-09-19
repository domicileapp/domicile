import { User } from '@/users/user.entity'
import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Task } from './task.entity'

@Entity('todo')
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number

  @ApiProperty()
  @CreateDateColumn()
  readonly createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  readonly updatedAt: Date

  @Column()
  title: string

  @Column({ nullable: true })
  description?: string

  @ManyToOne((type) => User)
  owner?: User

  @OneToMany((type) => Task, (task) => task.todo)
  tasks?: Task[]
}
