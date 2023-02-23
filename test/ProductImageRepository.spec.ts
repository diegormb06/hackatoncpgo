import test from "japa";
import ProductImageRepository from "App/Repositories/ProductImageRepository";
const productImageRepository = new ProductImageRepository();

const imageAttributes = [
  "id",
  "product_id",
  "path",
  "created_at",
  "updated_at",
];

test.group("Test ProductImageRepository", () => {
  test("ProductImageRepository.create should create and returns an image data", async (assert) => {
    const newImage = await productImageRepository.create({
      product_id: 1,
      path: "products/imagem-do-produto.jpg",
    });

    assert.isObject(newImage);
    assert.containsAllKeys(newImage, imageAttributes);
  });
});
