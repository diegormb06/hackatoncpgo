import ShopRepository from "App/Repositories/ShopRepository";
import IShopRepository from "Contracts/interfaces/IShopRepository";
import { IShopServices } from "Contracts/interfaces/IShopServices";
import { PaymentService } from "./PaymentService";

export default class ShopServices implements IShopServices {
  constructor(
    private shopRepository: IShopRepository = new ShopRepository(),
    private paymentGatewayService: PaymentService = new PaymentService()
  ) {}

  async getShops(page) {
    return this.shopRepository.getAll(page);
  }

  async findShop(id: number) {
    return await this.shopRepository.findOne(id);
  }

  async createShop(data: Shop) {
    const newShop = await this.shopRepository.create(data);

    if (newShop.id) {
      const paymentGatewayAccount =
        await this.paymentGatewayService.createShopAccount(data);

      if (!paymentGatewayAccount?.account) {
        throw new Error("Payment gateway account not created");
      }

      const newShopData = {
        ...data,
        payment_account: paymentGatewayAccount.account.id,
      };

      return this.updateShop(newShop.id, newShopData);
    }

    return newShop;
  }

  updateShop(id: number, data: object) {
    return this.shopRepository.update(id, data);
  }

  deleteShop(id: number) {
    return this.shopRepository.delete(id);
  }

  searchShop(qs: Record<string, any>) {
    return this.shopRepository.search(qs);
  }

  registerConfirmation(id: number, data: object) {
    return this.shopRepository.update(id, data);
  }

  async getOrdersByShop(shopId, page) {
    return this.shopRepository.getOrdersByShop(shopId, page);
  }

  async getProductsByShop(shopId, page) {
    return this.shopRepository.getProductsByShop(shopId, page);
  }
}
