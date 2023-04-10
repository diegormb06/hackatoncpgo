import test from "japa";
import supertest from "supertest";
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const api = supertest(BASE_URL + "/autofast/api");

test.group("Test API", () => {
  test("Ensure api response with status code 200", async () => {
    await api.get("/").expect(200);
  });
});
