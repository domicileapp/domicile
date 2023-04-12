import { getRepositoryToken } from '@mikro-orm/nestjs'
import { Test, TestingModule } from '@nestjs/testing'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

describe('TasksService', () => {
  let service: TasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: Task,
        },
      ],
    }).compile()

    service = module.get<TasksService>(TasksService)
  })

  it('TasksService - should be defined', () => {
    expect(service).toBeDefined()
  })
})
