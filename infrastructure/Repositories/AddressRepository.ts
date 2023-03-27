import BaseRepository from "Infrastructure/Repositories/BaseRepository";
import Address from "Infrastructure/database/Models/Address";

export default class AddressRepository extends BaseRepository {
  constructor() {
    super(Address);
  }
}
