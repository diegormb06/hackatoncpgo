import BaseRepository from "App/repository/BaseRepository";
import Order from "App/Models/Order";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Order);
  }
}
