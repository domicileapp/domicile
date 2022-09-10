import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, IsString } from 'class-validator'

@InputType()
export class LoginUserInput {
  @Field()
  @IsEmail()
  readonly email: string

  @Field()
  @IsString()
  password: string
}
