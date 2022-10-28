import { DateTime } from "luxon";
import {
  BelongsTo,
  HasMany,
  BaseModel,
  belongsTo,
  column,
  hasMany,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import OrderItem from "App/Models/OrderItem";
import User from "App/Models/User";
import Address from "App/Models/Address";
import Shop from "./Shop";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public ship_address: number;

  @column()
  public freight: number;

  @column()
  public total_value: number;

  @column()
  public total_quantity: number;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => OrderItem)
  public items: HasMany<typeof OrderItem>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Shop)
  public shop: BelongsTo<typeof Shop>;

  @hasOne(() => Address)
  public address: HasOne<typeof Address>;
}
