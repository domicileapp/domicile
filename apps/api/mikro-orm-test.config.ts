import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { LoadStrategy } from '@mikro-orm/core'

const testConfig: Options = {
  type: 'sqlite',
  dbName: 'domicile-test-db',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  loadStrategy: LoadStrategy.JOINED,
  metadataProvider: TsMorphMetadataProvider,
  registerRequestContext: false,
  migrations: {
    path: 'dist/database/migrations/test',
    pathTs: 'src/database/migrations/test',
  },
}

export default testConfig
