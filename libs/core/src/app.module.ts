import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RoleModule } from './role/role.module'
import { UsersModule } from './users/users.module'
import { TasksModule } from './tasks/tasks.module'
import { SharedModule } from './shared/shared.module'

@Module({
  imports: [RoleModule, UsersModule, TasksModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
