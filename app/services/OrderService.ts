import OrderRepository from "../repository/OrderRepository";

export default class OrderService {
  private readonly orderRepository: OrderRepository = new OrderRepository();

  getOrder() {
    return this.orderRepository.getAll();
  }

  showOrder(id: number) {
    return this.orderRepository.getOrder(id);
  }

  createOrder(orderData: any) {
    return this.orderRepository.createOrder(orderData);
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
