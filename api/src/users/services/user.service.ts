import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { plainToClass } from 'class-transformer'
import { Repository } from 'typeorm'

import { AppLogger } from '../../shared/logger/logger.service'
import { RequestContext } from '../../shared/request-context/request-context.dto'
import { CreateUserInput } from '../dtos/user-create-input.dto'
import { UserOutput } from '../dtos/user-output.dto'
import { UpdateUserInput } from '../dtos/user-update-input.dto'
import { User } from '../entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    private userRepository: Repository<User>,
    private readonly logger: AppLogger
  ) {
    this.logger.setContext(UserService.name)
  }
  async createUser(
    ctx: RequestContext,
    input: CreateUserInput
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.createUser.name} was called`)

    const user = plainToClass(User, input)

    user.password = await hash(input.password, 10)

    this.logger.log(ctx, `calling ${User.name}.saveUser`)
    await this.userRepository.save(user)

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async validateUsernamePassword(
    ctx: RequestContext,
    username: string,
    pass: string
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.validateUsernamePassword.name} was called`)

    const user = await this.userRepository.findOneBy({ username })
    if (!user) throw new UnauthorizedException()

    const match = await compare(pass, user.password)
    if (!match) throw new UnauthorizedException()

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async getUsers(
    ctx: RequestContext,
    limit: number,
    offset: number
  ): Promise<{ users: UserOutput[]; count: number }> {
    this.logger.log(ctx, `${this.getUsers.name} was called`)

    const [users, count] = await this.userRepository.findAndCount({
      where: {},
      take: limit,
      skip: offset,
    })

    const usersOutput = plainToClass(UserOutput, users, {
      excludeExtraneousValues: true,
    })

    return { users: usersOutput, count }
  }

  async findById(ctx: RequestContext, id: number): Promise<UserOutput> {
    this.logger.log(ctx, `${this.findById.name} was called`)

    const user = await this.userRepository.findOneBy({ id })

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async getUserById(ctx: RequestContext, id: number): Promise<UserOutput> {
    this.logger.log(ctx, `${this.getUserById.name} was called`)

    const user = await this.userRepository.findOneBy({ id })

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async findByUsername(
    ctx: RequestContext,
    username: string
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.findByUsername.name} was called`)

    const user = await this.userRepository.findOneBy({ username })

    return plainToClass(UserOutput, user, {
      excludeExtraneousValues: true,
    })
  }

  async updateUser(
    ctx: RequestContext,
    userId: number,
    input: UpdateUserInput
  ): Promise<UserOutput> {
    this.logger.log(ctx, `${this.updateUser.name} was called`)

    const user = await this.userRepository.findOneBy({ id: userId })

    // Hash the password if it exists in the input payload.
    if (input.password) {
      input.password = await hash(input.password, 10)
    }

    // merges the input (2nd line) to the found user (1st line)
    const updatedUser: User = {
      ...user,
      ...plainToClass(User, input),
    }

    await this.userRepository.save(updatedUser)

    return plainToClass(UserOutput, updatedUser, {
      excludeExtraneousValues: true,
    })
  }
}
