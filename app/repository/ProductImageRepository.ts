import BaseRepository from "App/repository/BaseRepository";
import ProductImage from "App/Models/ProductImage";

export default class ProductImageRepository extends BaseRepository {
  constructor() {
    super(ProductImage);
  }
}
