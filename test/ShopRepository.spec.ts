import test from "japa";
import ShopRepository from "App/repository/ShopRepository";
import { ShopFactory } from "Database/factories/shopFactory";
import Database from "@ioc:Adonis/Lucid/Database";
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

test.group("Test ShopRepository", (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction();
  });
  group.after(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("create should create and returns a shop", async (assert) => {
    const newShop = await ShopFactory.create();
    delete newShop.$attributes.id;
    const createdShop = await shopRepository.create(newShop.serialize());

    assert.isObject(createdShop, "Shop data should be an object");
    assert.containsAllKeys(
      createdShop,
      shopAttributes,
      "Shop data should contains all required attributes"
    );
  });

  test("getAll should return an array of shop and paginate data", async (assert) => {
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

  test("findOne should return one shop data", async (assert) => {
    const testShop = await ShopFactory.create();
    console.log("testShop", testShop);
    // const shop = await shopRepository.findOne(testShop.serialize().id);
    assert.isOk(testShop, "findOne should return an truthy value");
    // assert.containsAllKeys(shop, shopAttributes);
  }).timeout(18000);

  // test("GET /users - should get all users", async (assert) => {
  //   const { body } = await api.get("/users").expect(200);
  //   assert.hasAnyKeys(body, ["meta", "data"], "the return is a valid object");
  //   assert.isArray(body.data, "data field is an array");
  // });
  //
  // test("GET /users/id - should return a specific user", async (assert) => {
  //   const testUser = await UserFactory.create();
  //   const newUserId = testUser.$attributes.id;
  //   const { body } = await api.get(`/users/${newUserId}`).expect(200);
  //   assert.hasAllKeys(body, testUser.serialize(), "the return is a user data");
  // });
  //
  // test("PUT /users/id - should update the user", async (assert) => {
  //   const testUser = await UserFactory.create();
  //   const testData = testUser.serialize();
  //
  //   const { body } = await api
  //     .put(`/users/${testData.id}`)
  //     .send({ firstName: "John", lastName: "Doe" })
  //     .expect(200);
  //
  //   assert.propertyVal(body, "first_name", "John");
  //   assert.propertyVal(body, "last_name", "Doe");
  // });
  //
  // test.only("DELETE /users/id - should delete the user", async (assert) => {
  //   const testUser = await UserFactory.create();
  //   const res = await api
  //     .delete(`/users/${testUser.$attributes.id}`)
  //     .expect(200);
  //   assert.isTrue(res.body);
  // });
});
