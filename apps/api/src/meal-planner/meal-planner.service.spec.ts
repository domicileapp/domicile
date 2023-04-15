import { Test, TestingModule } from '@nestjs/testing';
import { MealPlannerService } from './meal-planner.service';

describe('MealPlannerService', () => {
  let service: MealPlannerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealPlannerService],
    }).compile();

    service = module.get<MealPlannerService>(MealPlannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
