import test from "japa";
import fs from "fs";
import path from "path";
import supertest from "supertest";
import * as faker from "faker";
import { UserFactory } from "Database/factories/userFactory";
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const api = supertest(BASE_URL + "/api");
const basePath = path.join(__dirname, "..", "uploads", "photos/");

test.group("Test ImageService", () => {
  test.only("ImageService.uploadPhoto should upload and save a user Photo", async (assert) => {
    // const userID = (await UserFactory.create()).id;
    const avatar = fs.readFileSync(
      "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg"
    );
    console.log("buffer", avatar);
    // const { text } = await api
    //   .post(`/uploads/photo/${userID}`)
    //   .attach("photo", avatar, "avatar.jpg")
    //   .expect(200);

    // const newImage = JSON.parse(text).photo;
    // assert.isOk(fs.existsSync(`${basePath}/${newImage}`));
  });

  test("ImageService.uploadProductImages should upload one or many product images", async (assert) => {
    const { text } = await api
      .post("/uploads/images/1")
      .attach("images", `${__dirname}/foto.jpg`)
      .expect(200);

    const newImage = JSON.parse(text).photo;
    assert.isOk(fs.existsSync(`${basePath}/${newImage}`));
  });
});
