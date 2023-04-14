import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { TokenExpiredError } from 'jsonwebtoken'
import { User } from '../users/user.entity'
import { UsersService } from '../users/users.service'
import { RefreshToken } from './entities/refresh-token.entity'

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: EntityRepository<RefreshToken>,
  ) {}

  async validateUser(username: string, plainTextPassword: string) {
    /*
     * @TODO: Update the users service to allow input of populate properties.
     * This means we can set the password property on the entity back to hidden & lazy
     * so it doesn't return the hashed password.
     */
    const user = await this.usersService.findOne({
      username,
    })
    // this.logger.log(plainTextPassword, user.password)

    if (user) {
      const match = await bcrypt.compare(plainTextPassword, user.password)
      if (match) {
        return user
      }
    }
    return null
  }

  async generateAccessToken(user: Pick<User, 'id'>) {
    const payload = { sub: String(user.id) }
    return await this.jwtService.signAsync(payload)
  }

  async createRefreshToken(user: Pick<User, 'id'>, ttl: number) {
    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    const token = this.refreshTokenRepository.create({
      user,
      expires: expiration,
    })

    await this.refreshTokenRepository.persistAndFlush(token)

    return token
  }

  async generateRefreshToken(user: Pick<User, 'id'>, expiresIn: number) {
    const payload = { sub: String(user.id) }
    const token = await this.createRefreshToken(user, expiresIn)
    return await this.jwtService.signAsync({
      ...payload,
      expiresIn,
      jwtId: String(token.id),
    })
  }

  async resolveRefreshToken(encoded: string) {
    try {
      const payload = await this.jwtService.verify(encoded)

      if (!payload.sub || !payload.jwtId) {
        throw new UnprocessableEntityException('Refresh token malformed')
      }

      const token = await this.refreshTokenRepository.findOne({
        id: payload.jwtId,
      })

      if (!token) {
        throw new UnprocessableEntityException('Refresh token not found')
      }

      if (token.revoked) {
        throw new UnprocessableEntityException('Refresh token revoked')
      }

      const user = await this.usersService.findOne({ id: payload.subject })

      if (!user) {
        throw new UnprocessableEntityException('Refresh token malformed')
      }

      return { user, token }
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired')
      } else {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
    }
  }

  async createAccessTokenFromRefreshToken(refresh: string) {
    const { user } = await this.resolveRefreshToken(refresh)

    const token = await this.generateAccessToken(user)

    return { user, token }
  }

  async register(username: string, password: string) {
    let user = await this.usersService.findOne({ username })
    if (user) {
      return null
    }
    const hashed = await bcrypt.hash(password, 10)
    user = await this.usersService.create({ username, password: hashed })
    return user
  }
}
