import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import ShopService from "App/services/ShopService";

export default class ShopsController {
  private readonly shopService: ShopService = new ShopService();

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
}
