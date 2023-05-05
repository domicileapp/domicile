import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { LoadStrategy } from '@mikro-orm/core'

const config: Options = {
  type: 'postgresql',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  loadStrategy: LoadStrategy.JOINED,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  registerRequestContext: false,
  migrations: {
    path: 'dist/database/migrations',
    pathTs: 'src/database/migrations',
  },
}

export default config
