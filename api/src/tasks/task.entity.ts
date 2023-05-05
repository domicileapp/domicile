import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { List } from '../lists/list.entity'
import { BaseEntity } from '../common/entities/base-entity.entity'
import { User } from '../users/user.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ tableName: 'tasks' })
export class Task extends BaseEntity {
  @Property()
  @ApiProperty({
    example: 'Clean out the fridge',
    description: 'Title of the task',
  })
  title: string

  @Property({ nullable: true })
  @ApiProperty({
    example: 'Be sure to remove all the shelving and scrub it.',
    description: 'Optional. Description of the task',
  })
  description?: string

  @ManyToOne()
  @ApiProperty({
    description: 'User. Creator of the task.',
  })
  createdBy: User

  @ManyToOne()
  @ApiProperty({
    description: 'List the task belongs to.',
  })
  list: List

  @Property({ default: false })
  @ApiProperty()
  complete: boolean
}
