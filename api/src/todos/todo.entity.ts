import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { List } from '../lists/list.entity'
import { BaseEntity } from '../database/entities/base-entity.entity'
import { User } from '../users/user.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ tableName: 'todos' })
export class Todo extends BaseEntity {
  @Property()
  @ApiProperty({
    example: 'Clean out the fridge',
    description: 'Title of the todo',
  })
  title: string

  @Property({ nullable: true })
  @ApiProperty({
    example: 'Be sure to remove all the shelving and scrub it.',
    description: 'Optional. Description of the todo',
  })
  description?: string

  @ManyToOne()
  @ApiProperty({
    description: 'User. Creator of the todo.',
  })
  createdBy: User

  @ManyToOne()
  @ApiProperty({
    description: 'List the todo belongs to.',
  })
  list: List
}
