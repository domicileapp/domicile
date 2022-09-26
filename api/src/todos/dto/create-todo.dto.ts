import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  readonly title: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string
}
