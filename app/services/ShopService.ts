import ShopRepository from "App/repository/ShopRepository";
import { PaymentService } from "./PaymentService";

export default class ShopService {
  private ShopRepository: ShopRepository = new ShopRepository();
  private PaymentGatewayService: PaymentService = new PaymentService();

  getShops() {
    return this.ShopRepository.getAll();
  }

  async showShop(id: number) {
    return await this.ShopRepository.findOne(id);
  }

  async createShop(data: Shop) {
    const paymentGatewayAccount =
      await this.PaymentGatewayService.createShopAccount(data);

    const newShopData = { ...data, payment_account: paymentGatewayAccount.id };
    return this.ShopRepository.create(newShopData);
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
