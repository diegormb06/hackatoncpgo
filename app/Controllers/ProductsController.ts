import { HttpContextContract as http } from "@ioc:Adonis/Core/HttpContext";
import ProductService from "App/services/ProductService";
import { UserRoles } from "../../domain/enums/UserRoles";

export default class ProductsController {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {}

  public async index({ request }: http) {
    const currentPage = request.input("page", 1);
    return this.productService.getProduct(currentPage);
  }

  public async store({ auth, request, response }: http) {
    const user = auth.user?.serialize();

    if (user && user.role !== UserRoles.SHOP && user.role !== UserRoles.ADMIN)
      return response.unauthorized(
        "Usuário não habilitado para criar produtos"
      );

    return this.productService.createProduct(request.all());
  }

  public async show({ params }: http) {
    return this.productService.showProduct(params.id);
  }

  public async update({ auth, params, request, response }: http) {
    const user = auth.user?.serialize();

    if (user && user.role !== "shop")
      return response.status(401).send({ message: "Unauthorized" });

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
