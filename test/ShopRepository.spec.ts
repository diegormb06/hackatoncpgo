import test from "japa";
import ShopRepository from "App/repository/ShopRepository";
import { ShopFactory } from "Database/factories/shopFactory";
import Shop from "App/Models/Shop";
const shopRepository = new ShopRepository();

const shopAttributes = [
  "id",
  "user_id",
  "name",
  "phone",
  "mobile_phone",
  "cnpj",
  "logo",
  "address",
  "zipcode",
  "number",
  "district",
  "complement",
  "city",
  "state",
  "country",
  "created_at",
  "updated_at",
];

test.group("Test ShopRepository", () => {
  test("ShopRepository.create should create and returns a shop", async (assert) => {
    const newShop = await ShopFactory.makeStubbed();
    delete newShop.$attributes.id;
    const createdShop = await shopRepository.create(newShop.serialize());

    assert.isObject(createdShop, "Shop data should be an object");
    assert.containsAllKeys(
      createdShop,
      shopAttributes,
      "Shop data should contains all required attributes"
    );
  });

  test("ShopRepository.getAll should return an array of shop and paginate data", async (assert) => {
    const shops = await shopRepository.getAll();
    assert.isOk(shops, "getAll return truthy value");
    assert.containsAllKeys(
      shops,
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
      "Shop data should contains all required attributes"
    );
    assert.isArray(shops.data, "data should be an array");
  });

  test("ShopRepository.findOne should return a shop data", async (assert) => {
    const testShop = await ShopFactory.create();
    const shop = await shopRepository.findOne(testShop.serialize().id);
    assert.isOk(testShop, "findOne should return an truthy value");
    assert.ownInclude(testShop.serialize(), shop);
  });

  test("shopRepository.update should update a shop data", async (assert) => {
    const testShop = await ShopFactory.create();
    const newTestShopData = await ShopFactory.makeStubbed();
    const { updatedAt, password, ...newData } = newTestShopData.serialize();
    const updatedShop = await shopRepository.update(
      testShop.serialize().id,
      newData
    );

    assert.isOk(updatedShop);
    assert.ownInclude(updatedShop.serialize(), newData);
  });

  test("shopRepository.delete should delete a shop", async (assert) => {
    const testShop = await ShopFactory.create();
    const deleteResponse = await shopRepository.delete(testShop.id);
    const tryFindShop = await Shop.find(testShop.id);
    assert.ownInclude(deleteResponse, { message: "success" });
    assert.isNull(tryFindShop);
  });
});
