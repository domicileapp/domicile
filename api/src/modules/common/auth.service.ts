import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

import * as bcrypt from 'bcrypt'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtTokenService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email)
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password
        return user
      }
    }

    return user
  }

  async generateUserCredentials(user: User) {
    const payload = {
      email: user.email,
      name: user.name,
      // role: user.role,
      sub: user.id,
    }

    return {
      access_token: this.jwtTokenService.sign(payload),
    }
  }
}
