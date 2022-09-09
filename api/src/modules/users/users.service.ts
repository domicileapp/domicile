import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInputError } from 'apollo-server-core'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UsersArgs } from './dto/users.args'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const { limit, offset } = usersArgs
    return this.usersRepository.find({
      skip: offset,
      take: limit,
    })
  }

  public async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ id })

    if (!user) {
      throw new UserInputError(`User #${id} not found`)
    }
    return user
  }

  public async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = bcrypt.hashSync(createUserInput.password, 8)

    const user = this.usersRepository.create({ ...createUserInput })
    return this.usersRepository.save(user)
  }

  public async update(
    id: string,
    updateUserInput: UpdateUserInput
  ): Promise<User> {
    updateUserInput.password = bcrypt.hashSync(updateUserInput.password, 8)

    const user = await this.usersRepository.preload({
      id: +id,
      ...updateUserInput,
    })

    if (!user) {
      throw new UserInputError(`User #${id} not found`)
    }
    return this.usersRepository.save(user)
  }

  public async remove(id: number): Promise<any> {
    const user = await this.findOneById(id)
    return this.usersRepository.remove(user)
  }
}
