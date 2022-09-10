// import { UserInputError } from 'apollo-server-express'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UsersArgs } from './dto/users.args'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { LoggedUserOutput } from './dto/logged-user.output'
import { LoginUserInput } from './dto/login.input'

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  public async users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.usersService.findAll(usersArgs)
  }

  @Query(() => User)
  public async user(@Args('id') id: number): Promise<User> {
    const user = await this.usersService.findOneById(id)
    return user
  }

  @Mutation(() => User)
  public async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return await this.usersService.create(createUserInput)
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return await this.usersService.update(id, updateUserInput)
  }

  @Mutation(() => User)
  public async removeUser(@Args('id') id: number): Promise<any> {
    return this.usersService.remove(id)
  }

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.login(loginUserInput)
  }
}
