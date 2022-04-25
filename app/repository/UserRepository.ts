import User from "App/Models/User";
import BaseRepository from "App/repository/BaseRepository";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findOne(id: number) {
    const data = await User.query().where('id', id).preload("shop").first();
    return data?.serialize();
  }
}
