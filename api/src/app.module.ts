import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'

import { TasksModule } from '@/tasks/tasks.module'
import { RecipesModule } from '@/recipes/recipes.module'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './tasks/entities/task.entity'
import { AuthModule } from '@auth/auth.module'
import { User } from './users/entities/user.entity'

@Module({
  imports: [
    AuthModule,
    // TasksModule,
    // RecipesModule,
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      installSubscriptionHandlers: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Task, User],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
