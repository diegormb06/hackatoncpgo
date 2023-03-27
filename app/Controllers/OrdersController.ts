import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import OrderServices from "@ioc:Api/OrderServices";
import { IOrderServices } from "Domain/interfaces/IOrderServices";

export default class OrdersController {
  constructor(private readonly orderService: IOrderServices = OrderServices) {}

  public async orderStats() {
    const orders = await this.orderService.getOrderStats();
    return orders;
  }

  public async index({ params }: http) {
    return this.orderService.getAllOrders(params.page);
  }

  public async store({ request }: http) {
    const newOrderData = request.all();
    return this.orderService.createOrder(newOrderData);
  }

  public async show({ params }: http) {
    return this.orderService.findOrder(params.id);
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
