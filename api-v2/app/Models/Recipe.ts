import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import User from './User'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public ingredients: string

  @column()
  public instructions: string

  @column()
  public userId: number

  @belongsTo(() => User, { localKey: 'userId', foreignKey: 'userId' })
  public createdBy: BelongsTo<typeof User>
}
