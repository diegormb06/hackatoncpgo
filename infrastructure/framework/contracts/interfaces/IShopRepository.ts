export interface IShopRepository {
  getAll(page: number): Promise<any>;
  findOne(shopId: number): Promise<any>;
  create(data: object): Promise<any>;
  update(id: number, data: object): Promise<any>;
  delete(id: number): Promise<any>;
  search(qs: Record<string, any>): Promise<any>;
  getProductsByShop(shopId: number, page: number): Promise<any>;
  getOrdersByShop(shopId: number, page: number): Promise<any>;
  confirmPaymentIntegration(accountId: string): Promise<any>;
}
