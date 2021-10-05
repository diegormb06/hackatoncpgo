import AddressRepository from "App/repository/AddressRepository";

export default class AddressService {
  private readonly addressRepository: AddressRepository = new AddressRepository();

  getAddress() {
    return this.addressRepository.getAll();
  }

  show(addressId) {
    return this.addressRepository.findOne(addressId);
  }

  createAddress(addressData) {
    return this.addressRepository.create(addressData);
  }

  updateAddress(addressData, addressId) {
    return this.addressRepository.update(addressData, addressId);
  }

  deleteAddress(addressId) {
    return this.addressRepository.delete(addressId);
  }
}
