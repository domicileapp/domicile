import { Test, TestingModule } from '@nestjs/testing'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { getRepositoryToken } from '@mikro-orm/nestjs'
import { Recipe } from './entity/recipe.entity'
import { CreateRecipeDto } from './dto/create-recipe.dto'

describe('RecipesService', () => {
  let service: RecipesService

  const mockedRepository = {
    findAll: jest.fn().mockImplementation(() => {
      return Promise.resolve([])
    }),
    findOne: jest.fn().mockImplementation((options) => {
      return Promise.resolve({
        id: 1 || options.id,
        createdAt: Date.now() || options.createdAt,
        updatedAt: Date.now() || options.updatedAt,
        title: 'test',
        ingredients: 'test',
        directions: 'test',
      })
    }),
    persistAndFlush: jest.fn().mockImplementation((dto: CreateRecipeDto) => {
      return Promise.resolve({
        ...dto,
      })
    }),
    count: jest.fn().mockImplementation(() => 0),
    remove: jest.fn().mockImplementation((id: string | number) => {
      return {
        entityRemoved: {
          id: Date.now(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
          title: 'test',
          ingredients: 'test',
          directions: 'test',
        },
        status: 200,
      }
    }),
    findOneOrFail: jest.fn().mockImplementation((id: string | number) => {
      return {
        id: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        title: 'test',
        ingredients: 'test',
        directions: 'test',
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        RecipesService,
        {
          provide: getRepositoryToken(Recipe),
          useValue: mockedRepository,
        },
      ],
    }).compile()

    service = module.get<RecipesService>(RecipesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should return all recipes', async () => {
    expect(await service.findAll()).toStrictEqual([])
  })
  it('should return one recipe', async () => {
    expect(await service.findOne(1)).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      title: 'test',
      ingredients: 'test',
      directions: 'test',
    })
  })
  it('should delete recipe', async () => {
    expect(await service.remove(1)).toEqual({
      entityRemoved: {
        id: expect.any(Number),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
        title: 'test',
        ingredients: 'test',
        directions: 'test',
      },
      status: 200,
    })
  })

  /**
   * @todo
   * @description for whatever reason this test is failing because
   * "this.recipes.create" is not a function. Will investigate later.
   */
  it('should create recipe', async () => {
    expect(
      await service.create({
        title: 'test',
        ingredients: 'test',
        directions: 'test',
      }),
    ).toEqual({
      entityRemoved: {
        id: expect.any(Number),
        createdAt: expect.any(Number),
        updatedAt: expect.any(Number),
        title: 'test',
        ingredients: 'test',
        directions: 'test',
      },
      status: 200,
    })
  })

  it('should create a new category', () => {
    const newCategory = service.createCategory({
      name: 'test category',
    })

    expect(newCategory).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
      title: 'test category',
      recipeCount: 0,
    })
  })
})
