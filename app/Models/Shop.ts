import { DateTime } from "luxon";
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "App/Models/User";
import Product from "App/Models/Product";

export default class Shop extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

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
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;
}
