import BaseRepository from "App/repository/BaseRepository";
import Product from "App/Models/Product";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Product);
  }

  async getAll(page: number) {
    const results = (
      await Product.query().preload("images").paginate(page, 10)
    ).serialize();
    return { data: results.data, ...results.meta };
  }

  async search(qs: Record<string, any>) {
    try {
      const query = Product.query();
      const props = Object.keys(qs);

      for (const prop of props) {
        if (prop.match(/^\w+_id/gm)) {
          query.where(prop, qs[prop]);
        } else {
          query.where(prop, "ILIKE", `%${qs[prop]}%`);
        }
      }

      return query.preload("images").paginate(1, 10);
    } catch (e) {
      return [];
    }
  }
}
