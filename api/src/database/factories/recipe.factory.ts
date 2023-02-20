import { Recipe } from '@/recipes/entity/recipe.entity'
import { Factory, Faker } from '@mikro-orm/seeder'

export class RecipeFactory extends Factory<Recipe> {
  model = Recipe

  definition(faker: Faker): Partial<Recipe> {
    return {
      title: faker.random.words(3),
      prepTime: parseInt(faker.random.numeric()),
      cookTime: parseInt(faker.random.numeric()),
      servingSize: parseInt(faker.random.numeric(1)),
      ingredients: faker.lorem.lines(5),
      directions: faker.lorem.paragraph(10),
    }
  }
}
