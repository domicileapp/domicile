import { InjectRepository } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { Recipe } from './recipe.entity'

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipes: EntityRepository<Recipe>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    return { message: 'This action adds a new recipe' }
  }

  findAll() {
    return this.recipes.findAll()
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`
  }
}
