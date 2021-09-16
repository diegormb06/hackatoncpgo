import BaseRepository from "App/repository/BaseRepository";
import Order from "App/Models/Order";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async getAll() {
    const results = (
      await Order.query().preload("user").preload("items").paginate(1, 15)
    ).serialize({
      relations: {
        user: {
          fields: ["fullname", "cpf", "email", "phone"],
        },
      },
    });
    return { data: results.data, ...results.meta };
  }

  async getOrdersByShop(shopId) {
    const results = (
      await Order.query()
        .preload("user")
        .preload("items", (itemsQuery) => {
          itemsQuery.where("shop_id", shopId);
        })
        .paginate(1, 15)
    ).serialize({
      relations: {
        user: {
          fields: ["fullname", "cpf", "email", "phone"],
        },
      },
    });
    return { data: results.data, ...results.meta };
  }
}
