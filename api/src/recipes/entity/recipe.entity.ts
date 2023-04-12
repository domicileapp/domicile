import { BaseEntity } from '@/common/entities/base-entity.entity'
import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'

import { RecipeCategory } from './category.entity'

@Entity({ tableName: 'recipes' })
export class Recipe extends BaseEntity {
  @Property()
  title: string

  @Property()
  prepTime?: number

  @Property()
  cookTime?: number

  @Property()
  servingSize?: number

  @Property({ columnType: 'text' })
  ingredients: string

  @Property({ columnType: 'text' })
  directions: string

  @ManyToMany()
  categories = new Collection<RecipeCategory>(this)
}
