import test from "japa";
import supertest from "supertest";
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const api = supertest(BASE_URL + "/api");

test.group("Test UserController", () => {
  test("Ensure create user works correctly", async (assert) => {
    const { body } = await api
      .post("/users")
      .send({ name: "john" })
      .expect(200);
  });

  test("Ensure api respond with a users list", async (assert) => {
    const { body } = await api.get("/users").expect(200);
    assert.hasAnyKeys(body, ["meta", "data"], "the return is a valid object");
    assert.isArray(body.data, "data field is an array");
  });
});
