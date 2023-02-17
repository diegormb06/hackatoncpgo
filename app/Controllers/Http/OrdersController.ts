import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import OrderRepository from "App/repository/OrderRepository";
import IOrderService from "Contracts/interfaces/IOrderService";
const orderRepository: OrderRepository = new OrderRepository();

export default class OrdersController {
  constructor(private orderService: IOrderService) {}

  public async orderStats() {
    const orders = await orderRepository.countOrders();
    return orders;
  }

  public async index() {
    return this.orderService.getOrder();
  }

  public async store({ request }: http) {
    const newOrderData = request.all();
    return this.orderService.createOrder(newOrderData);
  }

  public async show({ params }: http) {
    return this.orderService.showOrder(params.id);
  }

  public async update({ params, request }: http) {
    return this.orderService.updateOrder(params.id, request.all());
  }

  public async destroy({ params }: http) {
    return this.orderService.deleteOrder(params.id);
  }

  public async updateStatus({ params }: http) {
    return this.orderService.updateOrderStatus(params.orderId, params.status);
  }
}
