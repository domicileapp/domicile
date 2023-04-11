import { Recipe } from '@/recipes/entity/recipe.entity';
import { Factory, Faker } from '@mikro-orm/seeder';
export declare class RecipeFactory extends Factory<Recipe> {
    model: typeof Recipe;
    definition(faker: Faker): Partial<Recipe>;
}
