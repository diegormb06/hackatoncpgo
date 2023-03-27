import BaseRepository from "Infrastructure/Repositories/BaseRepository";
import ProductImage from "Infrastructure/database/Models/ProductImage";

export default class ProductImageRepository extends BaseRepository {
  constructor() {
    super(ProductImage);
  }
}
