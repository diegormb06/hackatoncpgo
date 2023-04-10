import test from "japa";
import supertest from "supertest";
import { UserFactory } from "Infrastructure/database/factories/userFactory";
import Database from "@ioc:Adonis/Lucid/Database";
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const api = supertest(BASE_URL + "/autofast/api");

test.group("Test UserController", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("POST /users - should create a user", async (assert) => {
    let newUserMock = (await UserFactory.makeStubbed()).serialize();
    const { first_name, last_name, email, cpf, phone } = newUserMock;
    const { body } = await api
      .post("/users")
      .send({ first_name, last_name, email, password: "12345678", cpf, phone })
      .expect(200);

    assert.containsAllKeys(body, [
      "first_name",
      "last_name",
      "email",
      "cpf",
      "phone",
    ]);
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
    assert.ownInclude(res.body, { message: `deleted with success` });
  });
});
