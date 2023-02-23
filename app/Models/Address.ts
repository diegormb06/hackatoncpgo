import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public zipcode: string;

  @column()
  public address: string;

  @column()
  public number: string;

  @column()
  public complement: string;

  @column()
  public district: string;

  @column()
  public city: string;

  @column()
  public state: string;

  @column()
  public country: string;

  @column()
  public isPrimary: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
