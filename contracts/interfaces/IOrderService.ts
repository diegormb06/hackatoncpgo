import Order from "App/Models/Order";

export default interface IOrderervices {
  getOrder(): Order;
  showOrder(id: number): Promise<Order>;
  createOrder(data: object): Promise<Order>;
  updateOrder(id: number, data: object): Promise<Order>;
  deleteOrder(id: number): Promise<{ message: string }>;
}
