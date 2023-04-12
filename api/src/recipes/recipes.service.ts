import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { HttpStatus, Injectable } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { Recipe } from './entity/recipe.entity'
import { wrap } from '@mikro-orm/core'

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipes: EntityRepository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = this.recipes.create(createRecipeDto)
    await this.recipes.persist(recipe).flush()

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
    this.recipes.removeAndFlush(recipe)
    return { status: HttpStatus.OK, entityRemoved: recipe }
  }
}
