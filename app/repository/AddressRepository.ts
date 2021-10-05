import BaseRepository from "App/repository/BaseRepository";
import Address from "App/Models/Address";

export default class AddressRepository extends BaseRepository {
  constructor() {
    super(Address);
  }
}
