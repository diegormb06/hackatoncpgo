import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import AddressService from "App/services/AddressService";

export default class AddressesController {
  private readonly addressService: AddressService = new AddressService();

  public async index() {
    return this.addressService.getAddress();
  }

  public async store({ request }: http) {
    console.log("dados do endereço", request.all());
    return this.addressService.createAddress(request.all());
  }

  public async show({ params }: http) {
    return this.addressService.show(params.id);
  }

  public async update({ params, request }: http) {
    return this.addressService.updateAddress(request.all(), params.id);
  }

  public async destroy({ params }: http) {
    return this.addressService.deleteAddress(params.id);
  }
}
