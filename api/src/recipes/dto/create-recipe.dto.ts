import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  title: string

  @ApiPropertyOptional()
  @IsOptional()
  prepTime?: number

  @ApiPropertyOptional()
  @IsOptional()
  cookTime?: number

  @ApiPropertyOptional()
  @IsOptional()
  servingSize?: number

  @ApiProperty()
  @IsString()
  ingredients: string

  @ApiProperty()
  @IsString()
  directions: string
}
