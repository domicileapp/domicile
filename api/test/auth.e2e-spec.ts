import { AuthModule } from '@/auth/auth.module'
import { AuthService } from '@/auth/auth.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

describe('Auth', () => {
  let app: INestApplication
  let authService: { findAll: () => ['test'] }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET cats`, () => {
    return request(app.getHttpServer()).get('/cats').expect(200).expect({
      data: authService.findAll(),
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
