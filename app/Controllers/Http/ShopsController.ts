import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import ShopRepository from "App/repository/ShopRepository";
import ShopService from "App/services/ShopService";

export default class ShopsController {
  private readonly shopService: ShopService = new ShopService();
  private readonly shopRepository: ShopRepository = new ShopRepository();

  public async index() {
    return this.shopService.getShops();
  }

  public async store({ request }: http) {
    return this.shopService.createShop(request.all());
  }

  public async show({ params }: http) {
    return this.shopService.showShop(params.id);
  }

  public async update({ params, request }: http) {
    const shopData = request.all();
    return this.shopService.updateShop(params.id, shopData);
  }

  public async destroy({ params }: http) {
    return this.shopService.deleteShop(params.id);
  }

  public async getProductsByShop({ params }: http) {
    const { shopId, page } = params;
    return this.shopRepository.getProductsByShop(shopId, page);
  }
}
