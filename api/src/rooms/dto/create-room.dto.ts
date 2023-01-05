import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  readonly name: string
}