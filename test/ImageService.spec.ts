import test from 'japa'
import fs from 'fs'
import path from "path";
import supertest from "supertest";
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const api = supertest(BASE_URL + "/api");
const basePath = path.join(__dirname,'..', 'uploads', 'photos/')

test.group("Test ImageService", () => {
  test.only("ImageService.uploadPhoto should upload and save a user Photo", async (assert) => {
    api.post("/uploads/photos/1").attach('image', 'some path')

    const file = basePath + 'ckseusbpc0001oki23h50amtp.jpg';
    console.log(fs.existsSync(file))
    console.log('path',file);
    assert.isOk(fs.existsSync(file));
  });
});
