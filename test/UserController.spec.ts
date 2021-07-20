import test from "japa";
import supertest from "supertest";
import { UserFactory } from "Database/factories/userFactory";
import Database from "@ioc:Adonis/Lucid/Database";
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const api = supertest(BASE_URL + "/api");

test.group("Test UserController", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("POST /users - should create a user", async (assert) => {
    const newUserMock = await UserFactory.makeStubbed();
    delete newUserMock.$attributes.id;

    const { body } = await api
      .post("/users")
      .send(newUserMock.$attributes)
      .expect(200);

    assert.containsAllKeys(body, newUserMock.serialize());
  });

  test("GET /users - should get all users", async (assert) => {
    const { body } = await api.get("/users").expect(200);
    assert.hasAnyKeys(body, ["meta", "data"], "the return is a valid object");
    assert.isArray(body.data, "data field is an array");
  });

  test("GET /users/id - should return a specific user", async (assert) => {
    const testUser = await UserFactory.create();
    const newUserId = testUser.$attributes.id;
    const { body } = await api.get(`/users/${newUserId}`).expect(200);
    assert.hasAllKeys(body, testUser.serialize(), "the return is a user data");
  });

  test("PUT /users/id - should update the user", async (assert) => {
    const testUser = await UserFactory.create();
    const testData = testUser.serialize();

    const { body } = await api
      .put(`/users/${testData.id}`)
      .send({ firstName: "John", lastName: "Doe" })
      .expect(200);

    assert.propertyVal(body, "first_name", "John");
    assert.propertyVal(body, "last_name", "Doe");
  });

  test("DELETE /users/id - should delete the user", async (assert) => {
    const testUser = await UserFactory.create();
    const res = await api
      .delete(`/users/${testUser.$attributes.id}`)
      .expect(200);
    assert.isObject(res.body);
    assert.ownInclude(res.body, { message: "success" });
  });
});
