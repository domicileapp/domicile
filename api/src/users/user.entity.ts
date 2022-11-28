import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { RefreshToken } from '../auth/entities/refresh-token.entity'
import { BaseEntity } from '../common/entities/base-entity.entity'
import { List } from '../lists/list.entity'

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property()
  @Unique()
  @ApiProperty({
    example: 'patrick',
    description: 'Username. Alphanumeric, 2-24 characters.',
  })
  username: string

  @Property()
  @ApiHideProperty()
  password: string

  @Property({ nullable: true })
  @ApiProperty({
    example: 'John',
    description: "User's first name",
  })
  firstName: string

  @Property({ nullable: true })
  @ApiProperty({
    example: 'Smith',
    description: "User's last name",
  })
  lastName: string

  @OneToMany(() => List, (list) => list.createdBy, {
    cascade: [Cascade.REMOVE],
  })
  @ApiProperty({
    description: 'Lists created by user.',
  })
  lists = new Collection<List>(this)

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: [Cascade.REMOVE],
  })
  @ApiProperty()
  refreshTokens = new Collection<RefreshToken>(this)
}
