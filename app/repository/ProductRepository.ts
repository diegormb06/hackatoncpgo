import BaseRepository from "App/repository/BaseRepository";
import Product from "App/Models/Product";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async getAll() {
    const results = (
      await Product.query().preload("images").paginate(1, 10)
    ).serialize();
    return { data: results.data, ...results.meta };
  }
}
