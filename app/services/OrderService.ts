import OrderRepository from "../repository/OrderRepository";

export default class OrderService {
  private readonly orderRepository: OrderRepository = new OrderRepository();

  getOrder() {
    return this.orderRepository.getAll();
  }

  showOrder(id: number) {
    return await this.orderRepository.findOne(id);
  }

  createOrder(data: object) {
    return this.orderRepository.create(data);
  }

  updateOrder(id: number, data: object) {
    return this.orderRepository.update(id, data);
  }

  deleteOrder(id: number) {
    return this.orderRepository.delete(id);
  }
}
