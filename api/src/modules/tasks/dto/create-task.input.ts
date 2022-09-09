import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateTaskInput {
  @Field({ nullable: false })
  title: string
}
