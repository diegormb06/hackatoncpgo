import { ShopStatus } from "Domain/enums/ShopStatus";
import Shop from "Infrastructure/database/Models/Shop";
import { IShopRepository } from "Domain/interfaces/IShopRepository";
import BaseRepository from "Infrastructure/Repositories/BaseRepository";

export class ShopRepository extends BaseRepository implements IShopRepository {
  constructor() {
    super(Shop);
  }

  async findOne(shopId: number) {
    const shop = await Shop.query()
      .where("id", shopId)
      .preload("user")
      .firstOrFail();

    return shop;
  }

  async getAll(page: number = 1) {
    const shops = await Shop.query().preload("user").paginate(page, 10);
    return shops;
  }

  async getProductsByShop(shopId, page) {
    const shop = await Shop.findOrFail(shopId);
    return await shop
      .related("products")
      .query()
      .preload("images")
      .paginate(page, 10);
  }

  async getOrdersByShop(shopId, page) {
    const shop = await Shop.findOrFail(shopId);
    return shop.related("orders").query().paginate(page, 10);
  }

  async confirmPaymentIntegration(accountId: string) {
    const shop = await Shop.findByOrFail("payment_account", accountId);
    shop.status = ShopStatus.ACTIVE;
    await shop.save();

    return shop;
  }
}
