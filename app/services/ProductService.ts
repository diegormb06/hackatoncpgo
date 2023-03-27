import ProductRepository from "../../infrastructure/Repositories/ProductRepository";

export default class ProductService {
  private readonly productRepository: ProductRepository =
    new ProductRepository();

  getProduct(page) {
    return this.productRepository.getAll(page);
  }

  async showProduct(id: number) {
    return await this.productRepository.findOne(id);
  }

  async createProduct(data: object) {
    return await this.productRepository.create(data);
  }

  updateProduct(id: number, data: object) {
    return this.productRepository.update(id, data);
  }

  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }

  searchProduct(qs: Record<string, any>) {
    return this.productRepository.search(qs);
  }
}
