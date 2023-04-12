import { Test } from '@nestjs/testing'
import { RecipesController } from './recipes.controller'
import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { RecipesService } from './recipes.service'
import { Recipe } from './entity/recipe.entity'
import testConfig from 'mikro-orm-test.config'

describe('RecipesController', () => {
  let controller: RecipesController
  let orm: MikroORM

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot({
          ...testConfig,
          allowGlobalContext: true,
        }),
        MikroOrmModule.forFeature({ entities: [Recipe] }),
      ],
      controllers: [RecipesController],
      providers: [RecipesService],
    }).compile()
    controller = module.get<RecipesController>(RecipesController)
    orm = module.get(MikroORM)
    await orm.getSchemaGenerator().refreshDatabase()
  })

  afterAll(async () => await orm.close(true))

  it(`CRUD`, async () => {
    const res1 = await controller.create({
      title: 'Nachos',
      ingredients: 'Chips, Cheese',
      directions: 'Make the recipe',
    })
    expect(res1.id).toBeDefined()
    expect(res1.title).toBe('Nachos')
    expect(res1.ingredients).toBe('Chips, Cheese')
    expect(res1.directions).toBe('Make the recipe')

    const id = res1.id.toString()

    const res2 = await controller.findAll()
    expect(res2[0].id).toBeDefined()
    expect(res2[0].title).toBe('Nachos')
    expect(res2[0].ingredients).toBe('Chips, Cheese')
    expect(res2[0].directions).toBe('Make the recipe')

    const res3 = await controller.update(id, { title: 'Ultimate Nachos' })
    expect(res3.id).toBeDefined()
    expect(res3.title).toBe('Ultimate Nachos')
    expect(res3.ingredients).toBe('Chips, Cheese')
  })
})
