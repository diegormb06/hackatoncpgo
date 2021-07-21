import test from "japa";
import ProductRepository from "App/repository/ProductRepository";
import { ProductFactory } from "Database/factories/productFactory";
import Product from "App/Models/Product";
const productRepository = new ProductRepository();

const productAttributes = [
  "id",
  "shop_id",
  "category_id",
  "title",
  "description",
  "price",
  "stock_quantity",
  "stars",
  "status",
  "created_at",
  "updated_at",
];

test.group("Test ProductRepository", () => {
  test.only("ProductRepository.create should create and returns an product", async (assert) => {
    const newProduct = await ProductFactory.makeStubbed();
    delete newProduct.$attributes.id;
    console.log(newProduct.$attributes);
    const createdProduct = await productRepository.create(
      newProduct.serialize()
    );

    assert.isObject(createdProduct, "product data should be an object");
    assert.containsAllKeys(createdProduct, productAttributes);
  });

  test("productRepository.getAll should return an array of product and paginate data", async (assert) => {
    const products = await productRepository.getAll();
    assert.isOk(products, "getAll return truthy value");
    assert.containsAllKeys(
      products,
      [
        "data",
        "total",
        "per_page",
        "current_page",
        "last_page",
        "first_page",
        "first_page_url",
        "last_page_url",
        "next_page_url",
        "previous_page_url",
      ],
      "product data should contains all required attributes"
    );
    assert.isArray(products.data, "data should be an array");
  });

  test("productRepository.findOne should return one product data", async (assert) => {
    const testProduct = await ProductFactory.create();
    const foundProduct = await productRepository.findOne(
      testProduct.serialize().id
    );
    assert.isOk(foundProduct, "findOne should return an truthy value");
    assert.containsAllKeys(
      foundProduct,
      productAttributes,
      "found product has all product attributes"
    );
    assert.ownInclude(
      testProduct.serialize(),
      foundProduct,
      "found product is equal to testProduct"
    );
  });

  test("productRepository.update should update an product data", async (assert) => {
    const testProduct = await ProductFactory.create();
    const newTestProductData = await ProductFactory.makeStubbed();
    const { updatedAt, password, ...newData } = newTestProductData.serialize();
    const updatedProduct = await productRepository.update(
      testProduct.serialize().id,
      newData
    );

    assert.isOk(updatedProduct);
    assert.ownInclude(updatedProduct.serialize(), newData);
  });

  test("productRepository.delete should delete a product", async (assert) => {
    const testProduct = await ProductFactory.create();
    const deleteResponse = await productRepository.delete(testProduct.id);
    const tryFindProduct = await Product.find(testProduct.id);
    assert.ownInclude(deleteResponse, { message: "success" });
    assert.isNull(tryFindProduct);
  });
});
