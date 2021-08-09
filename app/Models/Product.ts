import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Shop from "App/Models/Shop";
import Category from "App/Models/Category";
import ProductImage from "App/Models/ProductImage";

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public shopId: number;

  @column()
  public categoryId: number;

  @column()
  public title: string;

  @column()
  public description: string;

  @column()
  public price: string;

  @column()
  public stock_quantity: number;

  @column()
  public stars: number;

  @column()
  public status: string;

  @column()
  public created_at: DateTime;

  @column()
  public updated_at: DateTime;

  @column()
  public deleted_at: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Shop)
  public shop: BelongsTo<typeof Shop>;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>;
}
