import { DateTime } from "luxon";
import { BaseModel, belongsTo, BelongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";

export default class Shop extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number;

  @column()
  public name: string;

  @column()
  public phone: string;

  @column()
  public mobile_phone: string;

  @column()
  public cnpj: string;

  @column()
  public logo: string;

  @column()
  public zipcode: string;

  @column()
  public address: string;

  @column()
  public number: number;

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
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}
