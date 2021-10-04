import ShopRepository from "App/repository/ShopRepository";

export default class ShopService {
  private ShopRepository: ShopRepository = new ShopRepository();

  getShops() {
    return this.ShopRepository.getAll();
  }

  async showShop(id: number) {
    return await this.ShopRepository.findOne(id);
  }

  createShop(data: object) {
    return this.ShopRepository.create(data);
  }

  updateShop(id: number, data: object) {
    return this.ShopRepository.update(id, data);
  }

  deleteShop(id: number) {
    return this.ShopRepository.delete(id);
  }

  searchShop(qs: Record<string, any>) {
    return this.ShopRepository.search(qs);
  }
}
