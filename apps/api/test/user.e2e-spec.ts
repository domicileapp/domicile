import { MikroORM } from '@mikro-orm/core'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { User } from '../src/users/user.entity'
import { UsersModule } from '../src/users/users.module'

let app: INestApplication
let orm: MikroORM

beforeAll(async () => {
  const module = await Test.createTestingModule({
    imports: [
      UsersModule,
      MikroOrmModule.forRoot({
        type: 'postgresql',
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        dbName: 'e2e_test',
        entities: ['dist/**/*.entity.js'],
        entitiesTs: ['src/**/*.entity.ts'],
        debug: true,
        metadataProvider: TsMorphMetadataProvider,
        registerRequestContext: false,
      }),
      MikroOrmModule.forFeature([User]),
    ],
  }).compile()
  app = module.createNestApplication()
  orm = app.get<MikroORM>(MikroORM)
  await app.init()
})

afterAll(async () => {
  orm.close()
  await app.close()
})
