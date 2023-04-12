import { MikroOrmModule } from '@mikro-orm/nestjs'
import { forwardRef, Module } from '@nestjs/common'
import { ListsModule } from '../lists/lists.module'
import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [MikroOrmModule.forFeature([User]), forwardRef(() => ListsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
