import { BaseEntity } from '@/common/entities/base-entity.entity'
import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core'
import { ApiProperty } from '@nestjs/swagger'
import { Recipe } from './recipe.entity'

@Entity({ tableName: 'category' })
export class RecipeCategory extends BaseEntity {
  @Property()
  @ApiProperty()
  name: string

  @ManyToMany(() => Recipe, (recipe) => recipe.categories)
  recipes = new Collection<Recipe>(this)
}
