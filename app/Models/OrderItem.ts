import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Order from "App/Models/Order";

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public orderId: number;

  @column()
  public productId: number;

  @column()
  public shopId: number;

  @column()
  public title: string;

  @column()
  public unit_price: number;

  @column()
  public quantity: number;

  @column()
  public discount: number;

  @column()
  public total: number;

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>;
}
