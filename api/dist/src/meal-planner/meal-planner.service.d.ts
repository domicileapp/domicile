import { CreateMealPlannerDto } from './dto/create-meal-planner.dto';
import { UpdateMealPlannerDto } from './dto/update-meal-planner.dto';
export declare class MealPlannerService {
    create(createMealPlannerDto: CreateMealPlannerDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMealPlannerDto: UpdateMealPlannerDto): string;
    remove(id: number): string;
}
