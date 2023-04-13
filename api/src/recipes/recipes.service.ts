import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { Recipe } from './entity/recipe.entity'
import { wrap } from '@mikro-orm/core'
import { CreateCategoryDto } from './dto/create-category.dto'
import { RecipeCategory } from './entity/category.entity'

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipes: EntityRepository<Recipe>,
    @InjectRepository(RecipeCategory)
    private categories: EntityRepository<RecipeCategory>,
  ) {}

  /**
   * @todo
   * @description for whatever reason this test is failing because
   * "this.recipes.create" is not a function. Will investigate later.
   */
  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipes.create(createRecipeDto)
    await this.recipes.persistAndFlush(recipe)

    return recipe
  }

  async findAll() {
    const recipes = await this.recipes.findAll()
    return recipes
  }

  async findOne(id: number) {
    const recipe = await this.recipes.findOneOrFail(id)
    return recipe
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.recipes.findOne(id)
    wrap(recipe).assign(updateRecipeDto)
    await this.recipes.flush()

    return recipe
  }

  async remove(id: number) {
    const recipe = await this.recipes.findOne(id)
    this.recipes.remove(recipe)
    return { status: HttpStatus.OK, entityRemoved: recipe }
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categories.create(createCategoryDto)
  }
}
