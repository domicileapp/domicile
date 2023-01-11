import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhereProperty,
} from 'typeorm'
import { Transform, TransformFnParams, Type } from 'class-transformer'
import { IsNotEmpty, IsOptional, Max, Min, ValidateNested } from 'class-validator'
import { parseToBoolean, isObject, isClassInstance } from '@domicile/common'

export abstract class OptionsSelect<T = any> {
  @ApiPropertyOptional({ type: 'object' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => parseObject(value, parseToBoolean))
  readonly select?: FindOptionsSelect<T>
}

/**
 * Indicates what relations of entity should be loaded (simplified left join form).
 */
export abstract class OptionsRelations<T = any> extends OptionsSelect<T> {
  @ApiPropertyOptional({ type: 'object' })
  @IsOptional()
  readonly relations?: FindOptionsRelations<T>
}

export abstract class OptionParams<T> extends OptionsRelations<T> {
  /**
   * Order, in which entities should be ordered.
   */
  @ApiPropertyOptional({ type: 'object' })
  @IsOptional()
  readonly order: FindOptionsOrder<T>

  /**
   * Indicates if soft-deleted rows should be included in entity result.
   */
  @ApiPropertyOptional({ type: 'boolean' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => (value ? parseToBoolean(value) : false))
  readonly withDeleted?: boolean
}

/**
 * Describes generic pagination params
 */
export abstract class PaginationParams<T = any> extends OptionParams<T> {
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  @ApiPropertyOptional({ type: () => 'number', minimum: 0, maximum: 100 })
  @IsOptional()
  @Min(0)
  @Max(100)
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  readonly take: number = 10

  /**
   * Offset (paginated) where from entities should be taken.
   */
  @ApiPropertyOptional({ type: () => 'number', minimum: 0 })
  @IsOptional()
  @Min(0)
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  readonly skip: number = 0
}

/**
 * Parse object to specific type
 *
 * @param source
 * @returns
 */
export function parseObject(source: Object, callback: Function) {
  if (isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!isClassInstance(source[key])) {
          parseObject(source[key], callback)
        }
      } else {
        Object.assign(source, { [key]: callback(source[key]) })
      }
    }
  }
  return source
}
