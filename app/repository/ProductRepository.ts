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

  async search(qs: Record<string, any>) {
    try {
      const query = Product.query();

      for (const prop in qs) {
        prop.match(/^\w+_id/gm)
          ? query.where(prop, qs[prop])
          : query.where(prop, "ILIKE", `%${qs[prop]}%`);
      }

      return query;
    } catch (e) {
      return e;
    }
  }
}
