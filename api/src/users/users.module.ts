import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtStrategy } from '@/auth/strategies/jwt.strategy'
import { UsersController } from '@/users/users.controller'
import { User } from '@/users/user.entity'
import { UsersService } from '@/users/users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
