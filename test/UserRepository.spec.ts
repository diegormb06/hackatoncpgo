import test from "japa";
import UserRepository from "App/repository/UserRepository";
import { UserFactory } from "Database/factories/userFactory";
import Database from "@ioc:Adonis/Lucid/Database";
const userRepositorySpec = new UserRepository();

const userAttributes = ["id", "created_at", "updated_at"];

test.group("Test UserRepository", (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction();
  });
  group.after(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test.only("create should create and returns a user", async (assert) => {
    const newUser = await UserFactory.create();
    delete newUser.$attributes.id;
    const createdUser = await userRepositorySpec.create(newUser.serialize());

    assert.isObject(createdUser, "user data should be an object");
    assert.containsAllKeys(
      createdUser,
      userAttributes,
      "user data should contains all required attributes"
    );
  });
});
