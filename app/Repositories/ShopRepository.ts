import Shop from "App/Models/Shop";
import BaseRepository from "App/Repositories/BaseRepository";
import { IShopRepository } from "Contracts/interfaces/IShopRepository";

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
    return await shop.related("products").query().paginate(page, 10);
  }

  async getOrdersByShop(shopId, page) {
    const shop = await Shop.findOrFail(shopId);
    return shop.related("orders").query().paginate(page, 10);
  }
}
