import { Test, TestingModule } from '@nestjs/testing';
import { CookbooksController } from './cookbooks.controller';
import { CookbooksService } from './cookbooks.service';

describe('CookbooksController', () => {
  let controller: CookbooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookbooksController],
      providers: [CookbooksService],
    }).compile();

    controller = module.get<CookbooksController>(CookbooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
