import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoggedUserOutput {
  @Field(() => String, { description: `Generated access token for the user` })
  access_token: string
}
