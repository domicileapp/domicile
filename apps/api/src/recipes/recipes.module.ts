import { forwardRef, Module } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Recipe } from './entity/recipe.entity'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [MikroOrmModule.forFeature([Recipe]), forwardRef(() => UsersModule)],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
