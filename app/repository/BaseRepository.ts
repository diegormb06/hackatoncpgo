import IRepository from "Contracts/interfaces/repository";

export default abstract class BaseRepository implements IRepository {
  protected constructor(private model) {}

  async create(data: object) {
    const newData = await this.model.create(data);
    return newData.serialize();
  }

  async getAll(page = 1) {
    const results = (await this.model.query().paginate(page, 10)).serialize();
    return { data: results.data, ...results.meta };
  }

  async findOne(id: number) {
    const data = await this.model.findOrFail(id);
    return data.serialize();
  }

  async update(id: number, newData: object) {
    let data = await this.model.findOrFail(id);
    data.merge(newData);
    await data.save();
    return data;
  }

  async delete(id: number) {
    let model = await this.model.findOrFail(id);
    try {
      model.delete();
      return { message: "deleted with success" };
    } catch (e) {
      return e.message;
    }
  }

  async search(qs: any) {
    try {
      const query = this.model.query();
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
