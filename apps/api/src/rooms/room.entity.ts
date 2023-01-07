import { BaseEntity } from '@/common/entities/base-entity.entity'
import { User } from '@/users/user.entity'
import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'

@Entity({ tableName: 'rooms' })
export class Room extends BaseEntity {
  @Property()
  @ApiProperty({
    example: 'Main bedroom',
    description: 'Name of the room',
  })
  name: string

  @ManyToOne()
  @ApiProperty({
    description: 'User. Creator of the task.',
  })
  createdBy: User
}
