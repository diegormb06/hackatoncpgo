import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Product from "App/Models/Product";

export default class ProductImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public product_id: string;

  @column()
  public path: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Product)
  public product: BelongsTo<typeof Product>;
}
