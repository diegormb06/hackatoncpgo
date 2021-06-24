import IRepository from "Contracts/interfaces/repository";

export default abstract class BaseRepository implements IRepository {
  protected constructor(private model) {}

  async create(data: object) {
    return await this.model.create(data);
  }

  async getAll() {
    return await this.model.query().paginate(1, 10);
  }

  async findOne(id: number) {
    const data = await this.model.findOrFail(id);
    return data.serialize();
  }

  async update(id: number, newData: object) {
    let data = await this.findOne(id);
    data.merge(newData);
    await data.save();
    return data;
  }

  async delete(id: number) {
    return await this.model.findOrFail(id);
  }
}
