import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import ShopServices from "@ioc:Api/ShopServices";
import CreateShopValidator from "App/Validators/CreateShopValidator";
import { IShopServices } from "Contracts/interfaces/IShopServices";

export default class ShopsController {
  constructor(private readonly shopServices: IShopServices = ShopServices) {}

  async index({ params }: http) {
    const { page } = params;
    return this.shopServices.getShops(page);
  }

  async store({ request }: http) {
    await request.validate(CreateShopValidator);
    const newShopData = request.all() as Shop;
    return this.shopServices.createShop(newShopData);
  }

  async show({ params }: http) {
    return this.shopServices.findShop(params.id);
  }

  async update({ params, request }: http) {
    const shopData = request.all();
    return this.shopServices.updateShop(params.id, shopData);
  }

  async destroy({ params }: http) {
    return this.shopServices.deleteShop(params.id);
  }

  async getProductsByShop({ params, request }: http) {
    const { shopId } = params;
    const page = request.input("page", 1);
    return this.shopServices.getProductsByShop(shopId, page);
  }

  async getOrdersByShop({ params, request }: http) {
    const { shopId } = params;
    const page = request.input("page", 1);
    return this.shopServices.getOrdersByShop(shopId, page);
  }
}
