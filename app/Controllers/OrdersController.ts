import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import { OrderServices } from "App/services/OrderService";
import { UserRoles } from "Domain/enums/UserRoles";
import { IOrderServices } from "Domain/interfaces/IOrderServices";

export default class OrdersController {
  constructor(
    private readonly orderService: IOrderServices = new OrderServices()
  ) {}

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

  public async updateStatus({ auth, params, response }: http) {
    try {
      const user = auth.user?.serialize();
      const order = await this.orderService.findOrder(params.orderId);

      if (!order) return response.notFound("Order not found");
      if (user?.role !== UserRoles.SHOP && user?.role !== UserRoles.ADMIN)
        return response.unauthorized();

      await this.orderService.updateOrderStatus(params.orderId, params.status);
      return response.ok("status updated");
    } catch (error) {
      return response.status(500).send(error);
    }
  }
}
