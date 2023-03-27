import AddressRepository from "Infrastructure/Repositories/AddressRepository";

export default class AddressService {
  private readonly addressRepository: AddressRepository =
    new AddressRepository();

  getAddress() {
    return this.addressRepository.getAll();
  }

  show(addressId) {
    return this.addressRepository.findOne(addressId);
  }

  createAddress(addressData) {
    return this.addressRepository.create(addressData);
  }

  updateAddress(addressId: number, addressData: {}) {
    return this.addressRepository.update(addressId, addressData);
  }

  deleteAddress(addressId) {
    return this.addressRepository.delete(addressId);
  }
}
