import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public shop_id: string;

  @column()
  public category_id: string;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public price: string;

  @column()
  public stock_quantity: string;

  @column()
  public stars: string;

  @column()
  public status: string;

  @column()
  public created_at: string;

  @column()
  public updated_at: string;

  @column()
  public deleted_at: string;

  @column()
  public images: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
