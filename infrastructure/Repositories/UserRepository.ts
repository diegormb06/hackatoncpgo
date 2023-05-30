import BaseRepository from "Infrastructure/Repositories/BaseRepository";
import User from "Infrastructure/database/Models/User";
import IUserRepository from "Domain/interfaces/IUserRepository";

export default class UserRepository
  extends BaseRepository
  implements IUserRepository
{
  constructor() {
    super(User);
  }

  async findOne(id: number) {
    const data = await User.query()
      .where("id", id)
      .preload("shop")
      .preload("addresses")
      .first();
    return data?.serialize();
  }
}
