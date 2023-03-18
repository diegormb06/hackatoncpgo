import WebSocket from "App/services/WebSocket";
import { OrderStatus } from "App/domain/enums/OrderStatus";
import { IOrderServices } from "Contracts/interfaces/IOrderServices";
import { IOrderRepository } from "Contracts/interfaces/IOrderRepository";
import OrderRepository from "App/Repositories/OrderRepository";

export class OrderService implements IOrderServices {
  constructor(
    private readonly orderRepository: IOrderRepository = new OrderRepository()
  ) {}

  async getAllOrders(page) {
    return await this.orderRepository.getAll(page);
  }

  async getOrderStats() {
    return await this.orderRepository.ordersStats();
  }

  async findOrder(id: number) {
    return this.orderRepository.getOrder(id);
  }

  async createOrder(orderData: any) {
    const newOrder = await this.orderRepository.createOrder(orderData);

    if (!newOrder) throw new Error("Error creating order");

    WebSocket.io.emit("new:order", newOrder);
    return newOrder;
  }

  async updateOrder(id: number, data: object) {
    return this.orderRepository.update(id, data);
  }

  async updateOrderStatus(id: number, status: OrderStatus) {
    await this.orderRepository.update(id, { status });
    WebSocket.io.emit(`update:order-${id}`, status);
    return true;
  }

  async deleteOrder(id: number) {
    return this.orderRepository.delete(id);
  }

  async getOrdersByShop(shopId: number) {
    return this.orderRepository.getOrdersByShop(shopId);
  }
}
