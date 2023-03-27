import { DateTime } from "luxon";
import {
  BelongsTo,
  HasMany,
  BaseModel,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import OrderItem from "Infrastructure/database/Models/OrderItem";
import User from "Infrastructure/database/Models/User";

import Shop from "./Shop";
import { OrderStatus } from "Domain/enums/OrderStatus";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public freight: number;

  @column()
  public total_value: number;

  @column()
  public total_quantity: number;

  @column()
  public status: OrderStatus;

  @column()
  public ship_address: number;

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
}
