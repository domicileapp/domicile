import { Injectable } from '@nestjs/common';
import { CreateMealPlannerDto } from './dto/create-meal-planner.dto';
import { UpdateMealPlannerDto } from './dto/update-meal-planner.dto';

@Injectable()
export class MealPlannerService {
  create(createMealPlannerDto: CreateMealPlannerDto) {
    return 'This action adds a new mealPlanner';
  }

  findAll() {
    return `This action returns all mealPlanner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealPlanner`;
  }

  update(id: number, updateMealPlannerDto: UpdateMealPlannerDto) {
    return `This action updates a #${id} mealPlanner`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealPlanner`;
  }
}
