import Order from "Infrastructure/database/Models/Order";
import { OrderStatus } from "domain/enums/OrderStatus";
import Database from "@ioc:Adonis/Lucid/Database";
import BaseRepository from "./BaseRepository";
import { IOrderRepository } from "Domain/interfaces/IOrderRepository";

export default class OrderRepository
  extends BaseRepository
  implements IOrderRepository
{
  constructor() {
    super(Order);
  }

  async getAll() {
    const ordersList = await Order.query()
      .preload("user")
      .preload("items")
      .orderBy("created_at", "desc")
      .paginate(1, 15);

    return ordersList;
  }

  async getOrder(id: number) {
    return Order.query()
      .where("id", id)
      .preload("user")
      .preload("items")
      .first();
  }

  async createOrder(orderData) {
    const trx = await Database.transaction();

    try {
      const { items, ...newOrderData } = orderData;
      const newOrder = await Order.create(newOrderData, { client: trx });
      await newOrder.related("items").createMany(items);
      await trx.commit();

      const createdOrder = await this.getOrder(newOrder.id);
      return createdOrder;
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async updateOrderStatus(id: number, status: OrderStatus) {
    let data = await Order.findOrFail(id);
    data.merge({ status });
    await data.save();
    return status;
  }

  async getOrdersByShop(shopId, page) {
    const results = (
      await Order.query()
        .preload("user")
        .preload("items", (itemsQuery) => {
          itemsQuery.where("shop_id", shopId);
        })
        .paginate(page, 10)
    ).serialize();
    return { data: results.data, ...results.meta };
  }

  async ordersStats() {
    const orders = await Database.rawQuery(
      "select status, count (id) from orders GROUP BY status;"
    );
    return orders["rows"];
  }
}
