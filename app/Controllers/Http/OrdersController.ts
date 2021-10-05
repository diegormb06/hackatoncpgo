import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import OrderService from "App/services/OrderService";

export default class OrdersController {
  public readonly orderService: OrderService = new OrderService();

  public async index() {
    return this.orderService.getOrder();
  }

  public async store({ request }: http) {
    return this.orderService.createOrder(request.all());
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

  public async getOrdersByShop({ params }: http) {
    return this.orderService.getOrdersByShop(params.shop_id);
  }
}
