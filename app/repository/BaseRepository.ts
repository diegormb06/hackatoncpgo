import IRepository from "Contracts/interfaces/repository";

export default abstract class BaseRepository implements IRepository {
  protected constructor(private model) {}

  async create(data: object) {
    const newData = await this.model.create(data);
    return newData.serialize();
  }

  async getAll() {
    const results = (await this.model.query().paginate(1, 10)).serialize();
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

  async search(qs: Record<string, any>) {
    let results;
    for (const prop in qs) {
      console.log("qs." + prop + " = " + qs[prop]);
      results = this.model.where(function () {
        this.where(prop, "LIKE", `%${qs[prop]}%`);
      });
    }
    return await results.exec();
  }
}
