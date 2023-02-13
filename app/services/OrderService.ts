import OrderRepository from "../repository/OrderRepository";
import WebSocket from "App/services/WebSocket";
import { OrderStatus } from "App/domain/enums/OrderStatus";

export default class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  getOrder() {
    return this.orderRepository.getAll();
  }

  showOrder(id: number) {
    return this.orderRepository.getOrder(id);
  }

  async createOrder(orderData: any) {
    const newOrder = await this.orderRepository.createOrder(orderData);

    if (!newOrder) throw new Error("Error creating order");

    WebSocket.io.emit("new:order", newOrder);
    return newOrder;
  }

  updateOrder(id: number, data: object) {
    return this.orderRepository.update(id, data);
  }

  updateOrderStatus(id: number, status: OrderStatus) {
    this.orderRepository.update(id, { status });
    WebSocket.io.emit(`update:order-${id}`, status);
    return true;
  }

  deleteOrder(id: number) {
    return this.orderRepository.delete(id);
  }

  getOrdersByShop(shopId: number) {
    return this.orderRepository.getOrdersByShop(shopId);
  }
}
