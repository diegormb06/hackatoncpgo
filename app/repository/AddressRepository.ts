import BaseRepository from "App/repository/BaseRepository";
import Address from "App/Models/Address";

export default class UserRepository extends BaseRepository {
  constructor() {
    super(Address);
  }
}
