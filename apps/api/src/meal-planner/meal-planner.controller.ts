import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealPlannerService } from './meal-planner.service';
import { CreateMealPlannerDto } from './dto/create-meal-planner.dto';
import { UpdateMealPlannerDto } from './dto/update-meal-planner.dto';

@Controller('meal-planner')
export class MealPlannerController {
  constructor(private readonly mealPlannerService: MealPlannerService) {}

  @Post()
  create(@Body() createMealPlannerDto: CreateMealPlannerDto) {
    return this.mealPlannerService.create(createMealPlannerDto);
  }

  @Get()
  findAll() {
    return this.mealPlannerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealPlannerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealPlannerDto: UpdateMealPlannerDto) {
    return this.mealPlannerService.update(+id, updateMealPlannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealPlannerService.remove(+id);
  }
}
