import { getRepositoryToken } from '@mikro-orm/nestjs'
import { EntityManager } from '@mikro-orm/postgresql'
import { Test, TestingModule } from '@nestjs/testing'
import { UserFactory } from 'src/database/factories/user.factory'
import { User } from 'src/users/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './task.entity'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

function run(em: EntityManager): Promise<void> {
  return new UserFactory(em)
}

describe('TasksController Unit Tests', () => {
  let tasksController: TasksController
  let spyService: TasksService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TasksService,
      useFactory: () => ({
        create: jest.fn(),
        findAll: jest.fn(() => []),
        findOne: jest.fn(() => []),
        update: jest.fn(() => []),
        remove: jest.fn(() => []),
      }),
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        ApiServiceProvider,
        {
          provide: getRepositoryToken(Task),
          useValue: Task,
        },
      ],
    }).compile()

    tasksController = app.get<TasksController>(TasksController)
    spyService = app.get(TasksService)
  })

  it('calling create method', () => {
    const dto = new CreateTaskDto()
    expect(tasksController.create(userMock, dto)).not.toEqual(null)
  })
})
