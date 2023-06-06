import { ShopRepository } from "Infrastructure/Repositories/ShopRepository";
import { IShopRepository } from "Domain/interfaces/IShopRepository";
import { IShopServices } from "Domain/interfaces/IShopServices";
import { PaymentService } from "./PaymentService";
import IUserRepository from "Domain/interfaces/IUserRepository";
import UserRepository from "Infrastructure/Repositories/UserRepository";
import { UserRoles } from "Domain/enums/UserRoles";
import { IOrderRepository } from "Domain/interfaces/IOrderRepository";
import OrderRepository from "Infrastructure/Repositories/OrderRepository";

export default class ShopServices implements IShopServices {
  constructor(
    private shopRepository: IShopRepository = new ShopRepository(),
    private ordersRepository: IOrderRepository = new OrderRepository(),
    private userRepository: IUserRepository = new UserRepository(),
    private paymentGatewayService: PaymentService = new PaymentService()
  ) {}

  async getShops(page) {
    return this.shopRepository.getAll(page);
  }

  async findShop(id: number) {
    return await this.shopRepository.findOne(id);
  }

  async createShop(newShopData: Shop) {
    newShopData.country = "Brasil";
    const newShop = await this.shopRepository.create(newShopData);

    if (newShop.id) {
      const paymentGatewayAccount =
        await this.paymentGatewayService.createShopAccount(newShop);

      if (!paymentGatewayAccount?.account?.id) {
        throw new Error("Payment gateway account not created");
      }

      await this.userRepository.update(newShopData.user_id, {
        role: UserRoles.SHOP,
      });

      const newShopResponse = {
        ...newShopData,
        payment_account: paymentGatewayAccount.account.id,
      };

      return this.updateShop(newShop.id, newShopResponse);
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
    return this.ordersRepository.getOrdersByShop(shopId, page);
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
