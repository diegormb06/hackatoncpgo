import User from "App/Models/User";
import BaseRepository from "App/Repositories/BaseRepository";
import IUserRepository from "Contracts/interfaces/IUserRepository";
import { UserType } from "Contracts/interfaces/userService";

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
      .preload("address")
      .first();
    return data?.serialize() as UserType;
  }
}
