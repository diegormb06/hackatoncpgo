import BaseRepository from "App/repository/BaseRepository";
import Order from "App/Models/Order";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async getAll() {
    const results = (
      await Order.query().preload("user").preload("items").paginate(1, 15)
    ).serialize();
    return { data: results.data, ...results.meta };
  }

  async getOrder(id: number) {
    return Order.query().where("id", id).preload("user").preload("items");
  }

  async createOrder(orderData) {
    console.log(orderData);
    const { items, ...newOrderData } = orderData;
    const newOrder = await Order.create(newOrderData);
    newOrder.related("items").saveMany(items);
    return this.getOrder(newOrder.id);
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
