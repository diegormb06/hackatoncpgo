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

    if (!paymentGatewayAccount?.account) {
      throw new Error("Payment gateway account not created");
    }

    const newShopData = {
      ...data,
      payment_account: paymentGatewayAccount.account.id,
    };

    const newShop = await this.ShopRepository.create(newShopData);

    if (!newShop.id) {
      await this.PaymentGatewayService.removePaymentAccount(
        paymentGatewayAccount.account.id
      );

      throw new Error("Shop not created");
    }

    return newShop;
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

  registerConfirmation(id: number, data: object) {
    return this.ShopRepository.update(id, data);
  }
}
