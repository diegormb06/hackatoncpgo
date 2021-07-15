import test from "japa";
import Database from "@ioc:Adonis/Lucid/Database";
import ShopRepository from "App/repository/ShopRepository";
import { ShopFactory } from "Database/factories/shopFactory";
const shopRepository = new ShopRepository();

test.group("Test ShopRepository", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test.only("Test create should create and returns a shop", async (assert) => {
    const newShop = await ShopFactory.makeStubbed();
    console.log(newShop);
    const createdShop = shopRepository.create(newShop);
    assert.containsAllKeys(newShop, createdShop);
  });

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
