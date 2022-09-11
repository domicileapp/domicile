import { ObjectType, Field, ID, HideField } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  email: string

  @Column()
  @HideField()
  password: string
}
