import { FindOptions } from '@mikro-orm/core'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform, TransformFnParams } from 'class-transformer'
import { IsOptional } from 'class-validator'
import {
  isClassInstance,
  isObject,
  parseToBoolean,
} from '../../common/utils/shared'

/*
 * Specifies which column should be retrieved.
 */
export abstract class ObjectSelect<T = any> {
  @ApiPropertyOptional({ type: 'object' })
  @IsOptional()
  @Transform(({ value }: TransformFnParams) =>
    parseObject(value, parseToBoolean),
  )
  readonly select?: any
}

export abstract class OptionsSelect<T = any> {
  @ApiPropertyOptional({type: 'object'})
  @IsOptional()
  @Transform(({value}: TransformFnParams) => parseObject(value, parseToBoolean))
  readonly select?:
}

/**
 * Parse object to specific type
 *
 * @param source
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/ban-types
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
