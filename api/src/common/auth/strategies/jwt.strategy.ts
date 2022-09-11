import { Injectable, UnauthorizedException } from '@nestjs/common'

import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../interfaces/jwt-payload.interface'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _authService: AuthService // private configService:
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    })
  }

  async validate(payload: JwtPayload) {
    const user = await this._authService.validateJwtPayload(payload)

    if (!user) {
      throw new UnauthorizedException(
        'Email or password is incorrect. Your credentials could not be validated.'
      )
    }

    return user
  }
}
