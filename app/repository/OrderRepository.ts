import BaseRepository from "App/repository/BaseRepository";
import Order from "App/Models/Order";
import { OrderStatus } from "App/domain/enums/OrderStatus";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async getAll() {
    const results = (
      await Order.query()
        .preload("user")
        .preload("items")
        .orderBy("created_at", "desc")
        .paginate(1, 15)
    ).serialize();
    return { data: results.data, ...results.meta };
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
      return this.getOrder(newOrder.id);
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

  async getOrdersByShop(shopId) {
    const results = (
      await Order.query()
        .preload("user")
        .preload("items", (itemsQuery) => {
          itemsQuery.where("shop_id", shopId);
        })
        .paginate(1, 15)
    ).serialize();
    return { data: results.data, ...results.meta };
  }
}
