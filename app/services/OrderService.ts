import OrderRepository from "../repository/OrderRepository";
import WebSocket from "App/services/WebSocket";

export default class OrderService {
  private readonly orderRepository: OrderRepository = new OrderRepository();

  getOrder() {
    return this.orderRepository.getAll();
  }

  showOrder(id: number) {
    return this.orderRepository.getOrder(id);
  }

  async createOrder(orderData: any) {
    const newOrder = await this.orderRepository.createOrder(orderData);
    WebSocket.io.emit("new:order", newOrder);
    return newOrder;
  }

  updateOrder(id: number, data: object) {
    return this.orderRepository.update(id, data);
  }

  deleteOrder(id: number) {
    return this.orderRepository.delete(id);
  }

  getOrdersByShop(shopId: number) {
    return this.orderRepository.getOrdersByShop(shopId);
  }
}
