import { BaseEntity } from '@/common/entities/base-entity.entity';
import { Collection } from '@mikro-orm/core';
import { Recipe } from './recipe.entity';
export declare class RecipeCategory extends BaseEntity {
    name: string;
    recipes: Collection<Recipe, object>;
}
