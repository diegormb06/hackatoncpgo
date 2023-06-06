import { ModelPaginatorContract } from "@ioc:Adonis/Lucid/Orm";
import { OrderStatus } from "domain/enums/OrderStatus";
import Order from "Infrastructure/database/Models/Order";

export interface IOrderRepository {
  delete(id: number): Promise<boolean>;
  update(id: number, data: object): Promise<Order>;
  getAll(page: number): Promise<ModelPaginatorContract<Order>>;
  getOrder(id: number): Promise<Order | null>;
  createOrder(orderData: Order): Promise<Order | null>;
  updateOrderStatus(id: number, status: OrderStatus): Promise<OrderStatus>;
  getOrdersByShop(
    shopId: number,
    page: number
  ): Promise<ModelPaginatorContract<Order>>;
  ordersStats(): Promise<any>;
}
