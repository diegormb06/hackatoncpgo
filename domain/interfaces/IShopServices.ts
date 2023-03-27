import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import Shop from "Infrastructure/database/Models/Shop";

export interface IShopServices {
  createPaymentAccount(shopId: number): Promise<Shop>;
  getShops(page: number): Promise<ModelPaginatorContract<Shop>>;
  findShop(id: number): Promise<any>;
  createShop(data: object): Promise<any>;
  updateShop(id: number, data: object): Promise<any>;
  deleteShop(id: number): Promise<any>;
  searchShop(qs: Record<string, any>): Promise<any>;
  registerConfirmation(id: number, data: object): Promise<any>;
  getOrdersByShop(shopId: number, page: number): Promise<any>;
  getProductsByShop(shopId: number, page: number): Promise<any>;
  confirmIntegration(accountId: string): Promise<any>;
}
