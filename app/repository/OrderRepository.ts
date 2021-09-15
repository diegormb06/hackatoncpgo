import BaseRepository from "App/repository/BaseRepository";
import Order from "App/Models/Order";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Order);
  }

  async getAll() {
    const results = (
      await Order.query().preload("user").preload("items").paginate(1, 10)
    ).serialize();
    return { data: results.data, ...results.meta };
  }
}
