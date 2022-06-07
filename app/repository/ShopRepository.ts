import Shop from "App/Models/Shop";
import BaseRepository from "App/repository/BaseRepository";

export default class ShopRepository extends BaseRepository {
  constructor() {
    super(Shop);
  }

  async getProductsByShop(shopId, page) {
    const shop = await Shop.findOrFail(shopId);
    return await shop.related("products").query().paginate(page, 10);
  }
}
