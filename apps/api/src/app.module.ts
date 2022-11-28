import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import configuration from './config/configuration'
import { UsersModule } from './users/users.module'
import { ListsModule } from './lists/lists.module'
import { MikroORM } from '@mikro-orm/core'
import { TasksModule } from './tasks/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MikroOrmModule.forRoot(),
    UsersModule,
    AuthModule,
    ListsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up()
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*')
  }
}
