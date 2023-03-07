import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CurrentUser } from 'src/auth/decorator/current-user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { UserDto } from './dto/user.dto'
import { User } from './user.entity'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('users')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return users.map((u) => new UserDto(u))
  }

  @Get(':username')
  @ApiResponse({
    status: 200,
    description: 'The found user record',
    type: UserDto,
  })
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findOne({ username })
    return user && new UserDto(user)
  }

  @Put('profile')
  @ApiOkResponse({
    description: 'The found user record',
    type: UserDto,
  })
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateProfileDto,
  ) {
    const res = await this.usersService.update(user.id, updateUserDto)
    return res && new UserDto(res)
  }

  @Get('me')
  @ApiCreatedResponse({
    description: 'Returns the logged in user.',
    type: UserDto,
  })
  getProfile(@CurrentUser() user: User) {
    return user && new UserDto(user)
  }
}
