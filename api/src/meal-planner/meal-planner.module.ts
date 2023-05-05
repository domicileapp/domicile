import { Module } from '@nestjs/common';
import { MealPlannerService } from './meal-planner.service';
import { MealPlannerController } from './meal-planner.controller';

@Module({
  controllers: [MealPlannerController],
  providers: [MealPlannerService]
})
export class MealPlannerModule {}
