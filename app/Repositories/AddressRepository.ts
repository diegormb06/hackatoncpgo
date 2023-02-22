import BaseRepository from "App/Repositories/BaseRepository";
import Address from "App/Models/Address";

export default class AddressRepository extends BaseRepository {
  constructor() {
    super(Address);
  }
}
