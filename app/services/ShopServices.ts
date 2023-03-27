import { ShopRepository } from "Infrastructure/Repositories/ShopRepository";
import { IShopRepository } from "Domain/interfaces/IShopRepository";
import { IShopServices } from "Domain/interfaces/IShopServices";
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

      if (!paymentGatewayAccount?.account?.id) {
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

  async createPaymentAccount(shopId: number) {
    const shop = await this.shopRepository.findOne(shopId);

    if (!shop) {
      throw new Error("Shop not found");
    }

    if (shop.payment_account) {
      throw new Error("Payment account already created");
    }

    const paymentGatewayAccount =
      await this.paymentGatewayService.createShopAccount(shop);

    if (!paymentGatewayAccount?.account?.id) {
      throw new Error("Payment gateway account not created");
    }

    const newShopData = {
      ...shop,
      payment_account: paymentGatewayAccount.account.id,
    };

    return this.updateShop(shopId, newShopData);
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

  async confirmIntegration(paymentAccount) {
    const shop = await this.shopRepository.confirmPaymentIntegration(
      paymentAccount
    );

    return shop;
  }
}