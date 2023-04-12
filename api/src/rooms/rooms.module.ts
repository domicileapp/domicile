import { forwardRef, Module } from '@nestjs/common'
import { RoomsService } from './rooms.service'
import { RoomsController } from './rooms.controller'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Room } from './room.entity'
import { UsersModule } from '@/users/users.module'

@Module({
  imports: [MikroOrmModule.forFeature([Room]), forwardRef(() => UsersModule)],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
