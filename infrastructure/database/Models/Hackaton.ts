import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hackaton extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public serie: string;

  @column()
  public turma: string;

  @column()
  public indicios_bullyng: boolean;

  @column()
  public indicios_violencia: boolean;

  @column()
  public risco: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
