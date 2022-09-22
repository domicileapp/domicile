import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common'
import { Response } from 'express'
import { AuthService } from './auth.service'
import RegisterDto from './dto/register.dto'
import RequestWithUser from './requestWithUser.interface'
import { LocalAuthGuard } from './local-auth.guard'
import JwtAuthGuard from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData)
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request
    const cookie = this.authService.getCookieWithJwtToken(user.id)
    response.setHeader('Set-Cookie', cookie)
    user.password = undefined
    return response.send(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut())
    return response.sendStatus(200)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user
    user.password = undefined
    return user
  }
}
