import ProductRepository from "../repository/ProductRepository";

export default class ProductService {
  private readonly productRepository: ProductRepository = new ProductRepository();

  getProduct() {
    return this.productRepository.getAll();
  }

  async showProduct(id: number) {
    return await this.productRepository.findOne(id);
  }

  createProduct(data: object) {
    return this.productRepository.create(data);
  }

  updateProduct(id: number, data: object) {
    return this.productRepository.update(id, data);
  }

  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
