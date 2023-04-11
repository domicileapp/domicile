import { EntityRepository } from '@mikro-orm/postgresql';
import { HttpStatus } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entity/recipe.entity';
export declare class RecipesService {
    private recipes;
    constructor(recipes: EntityRepository<Recipe>);
    create(createRecipeDto: CreateRecipeDto): Promise<Recipe>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Recipe, never>[]>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<Recipe, never>>;
    update(id: number, updateRecipeDto: UpdateRecipeDto): Promise<import("@mikro-orm/core").Loaded<Recipe, never>>;
    remove(id: number): Promise<{
        status: HttpStatus;
        entityRemoved: import("@mikro-orm/core").Loaded<Recipe, never>;
    }>;
}
