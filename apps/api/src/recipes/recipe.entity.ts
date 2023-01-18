import { BaseEntity } from '@/common/entities/base-entity.entity'
import { Entity, Property } from '@mikro-orm/core'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

@Entity({ tableName: 'recipes' })
export class Recipe extends BaseEntity {
  @Property()
  @ApiProperty()
  title: string

  @Property()
  @ApiPropertyOptional()
  prepTime?: number

  @Property()
  @ApiPropertyOptional()
  cookTime?: number

  @Property()
  @ApiPropertyOptional()
  servingSize?: number

  @Property({ columnType: 'text' })
  @ApiPropertyOptional()
  ingredients?: string

  @Property({ columnType: 'text' })
  @ApiPropertyOptional()
  directions?: string
}