import { MikroOrmModule } from '@mikro-orm/nestjs'
import { forwardRef, Module } from '@nestjs/common'
import { PostsModule } from '../posts/posts.module'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [MikroOrmModule.forFeature([User]), forwardRef(() => PostsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
