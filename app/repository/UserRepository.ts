import User from "App/Models/User";
import BaseRepository from "App/repository/BaseRepository";
import { UserType } from "Contracts/interfaces/userService";

export default class UserRepository extends BaseRepository {
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
