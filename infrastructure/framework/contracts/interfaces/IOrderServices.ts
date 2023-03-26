import { OrderStatus } from "App/domain/enums/OrderStatus";
import Order from "App/Models/Order";
import { OrderStatsResponse } from "App/Types/OrderStatsResponse";

export interface IOrderServices {
  getAllOrders(page): Promise<Order[]>;
  getOrderStats(): Promise<OrderStatsResponse[]>;
  findOrder(id: number): Promise<Order | null>;
  createOrder(data: object): Promise<Order>;
  updateOrder(id: number, data: object): Promise<Order>;
  updateOrderStatus(id: number, data: OrderStatus): Promise<boolean>;
  deleteOrder(id: number): Promise<boolean>;
}
