import { MealPlannerService } from './meal-planner.service';
import { CreateMealPlannerDto } from './dto/create-meal-planner.dto';
import { UpdateMealPlannerDto } from './dto/update-meal-planner.dto';
export declare class MealPlannerController {
    private readonly mealPlannerService;
    constructor(mealPlannerService: MealPlannerService);
    create(createMealPlannerDto: CreateMealPlannerDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMealPlannerDto: UpdateMealPlannerDto): string;
    remove(id: string): string;
}
