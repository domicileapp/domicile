import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { List } from '../lists/list.entity'
import { BaseEntity } from '../database/entities/base-entity.entity'
import { User } from '../users/user.entity'

@Entity({ tableName: 'todos' })
export class Todo extends BaseEntity {
  @Property()
  title: string

  @Property({ nullable: true })
  description?: string

  @ManyToOne()
  createdBy: User

  @ManyToOne()
  todo: List
}
