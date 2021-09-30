import User from "App/Models/User";
import BaseRepository from "App/repository/BaseRepository";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}
