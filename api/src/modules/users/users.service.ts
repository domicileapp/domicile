import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserInputError } from 'apollo-server-core'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { AuthService } from '../common/auth.service'
import { CreateUserInput } from './dto/create-user.input'
import { LoginUserInput } from './dto/login.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UsersArgs } from './dto/users.args'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService
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

  public async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ email })

    if (!user) {
      throw new NotFoundException(`User not found with ${email}`)
    }

    return user
  }

  public async create(createUserInput: CreateUserInput): Promise<User> {
    const saltOrRounds = 10
    const password = createUserInput.password

    createUserInput.password = await bcrypt.hash(password, saltOrRounds)
    const user = this.usersRepository.save(createUserInput)
    return user
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

  public async login(loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password
    )

    if (!user) {
      throw new BadRequestException(`Email or password is invalid.`)
    }

    return this.authService.generateUserCredentials(user)
  }
}
