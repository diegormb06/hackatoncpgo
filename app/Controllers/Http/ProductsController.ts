import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import ProductService from "App/services/ProductService";

export default class ProductsController {
  private readonly productService: ProductService = new ProductService();

  public async index() {
    return this.productService.getProduct();
  }

  public async store({ request }: http) {
    return this.productService.createProduct(request.all());
  }

  public async show({ params }: http) {
    return this.productService.showProduct(params.id);
  }

  public async update({ params, request }: http) {
    return this.productService.updateProduct(params.id, request.all());
  }

  public async destroy({ params }: http) {
    return this.productService.deleteProduct(params.id);
  }

  public async searchProduct({ request }: http) {
    const queryString = request.qs();
    return this.productService.searchProduct(queryString);
  }
}
