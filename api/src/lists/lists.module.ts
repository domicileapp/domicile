import { UsersModule } from '@/users/users.module'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { forwardRef, Module } from '@nestjs/common'

import { List } from './list.entity'
import { ListsController } from './lists.controller'
import { ListsService } from './lists.service'

@Module({
  controllers: [ListsController],
  imports: [MikroOrmModule.forFeature([List]), forwardRef(() => UsersModule)],
  providers: [ListsService],
  exports: [ListsService],
})
export class ListsModule {}
