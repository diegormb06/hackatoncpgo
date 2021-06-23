import {
  BaseModel,
  beforeSave,
  column,
  computed,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import Shop from "App/Models/Shop";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public firstName: string;

  @column()
  public lastName: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public cpf: string;

  @column()
  public phone: string;

  @column()
  public photo: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  @computed()
  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @hasOne(() => Shop)
  public shop: HasOne<typeof Shop>;
}
