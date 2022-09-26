import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '../database/entities/base-entity.entity'
import { User } from '../users/user.entity'

@Entity({ tableName: 'lists' })
export class List extends BaseEntity {
  @Property()
  title: string

  @Property({ nullable: true })
  description?: string

  @ManyToOne()
  createdBy: User
}
