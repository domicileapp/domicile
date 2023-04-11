import { BaseEntity } from '@/common/entities/base-entity.entity';
import { Collection } from '@mikro-orm/core';
import { RecipeCategory } from './category.entity';
export declare class Recipe extends BaseEntity {
    title: string;
    prepTime?: number;
    cookTime?: number;
    servingSize?: number;
    ingredients: string;
    directions: string;
    categories: Collection<RecipeCategory, object>;
}
