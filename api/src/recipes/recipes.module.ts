import { forwardRef, Module } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Recipe } from './recipe.entity'
import { UsersModule } from '@/users/users.module'

@Module({
  controllers: [RecipesController],
  imports: [MikroOrmModule.forFeature([Recipe]), forwardRef(() => UsersModule)],
  providers: [RecipesService],
})
export class RecipesModule {}
