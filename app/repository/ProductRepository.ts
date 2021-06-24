import BaseRepository from "App/repository/BaseRepository";
import Product from "App/Models/Product";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Product);
  }
}
