import { Test, TestingModule } from '@nestjs/testing'
import { CookbooksService } from './cookbooks.service'

describe('CookbooksService', () => {
  let service: CookbooksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookbooksService],
    }).compile()

    service = module.get<CookbooksService>(CookbooksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
