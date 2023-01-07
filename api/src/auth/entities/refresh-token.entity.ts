import { Entity, ManyToOne, Property } from '@mikro-orm/core'
import { BaseEntity } from '@/common/entities/base-entity.entity'
import { User } from '@/users/user.entity'

@Entity({ tableName: 'refresh_tokens' })
export class RefreshToken extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE', joinColumn: 'user_id' })
  user: User

  @Property({ name: 'is_revoked' })
  revoked = false

  @Property()
  expires: Date
}
