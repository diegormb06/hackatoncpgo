import Shop from "App/Models/Shop";
import BaseRepository from "App/repository/BaseRepository";

export default class ShopRepository extends BaseRepository {
  constructor() {
    super(Shop);
  }
}
