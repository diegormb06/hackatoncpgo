import test from "japa";
import UserRepository from "App/repository/UserRepository";
import { UserFactory } from "Database/factories/userFactory";
import Database from "@ioc:Adonis/Lucid/Database";
const userRepository = new UserRepository();

const userAttributes = [
  "id",
  "first_name",
  "last_name",
  "password",
  "email",
  "cpf",
  "phone",
  "photo",
  "created_at",
  "updated_at",
];

test.group("Test UserRepository", (group) => {
  group.before(async () => {
    await Database.beginGlobalTransaction();
  });
  group.after(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("UserRepository.create should create and returns an user", async (assert) => {
    const newUser = await UserFactory.makeStubbed();
    delete newUser.$attributes.id;
    const createdUser = await userRepository.create(newUser.serialize());

    assert.isObject(createdUser, "user data should be an object");
    assert.containsAllKeys(
      createdUser,
      userAttributes,
      "user data should contains all required attributes"
    );
  });

  test("userRepository.getAll should return an array of user and paginate data", async (assert) => {
    const users = await userRepository.getAll();
    assert.isOk(users, "getAll return truthy value");
    assert.containsAllKeys(
      users,
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
      "user data should contains all required attributes"
    );
    assert.isArray(users.data, "data should be an array");
  });

  test("userRepository.findOne should return one user data", async (assert) => {
    const testUser = await UserFactory.create();
    const foundUser = await userRepository.findOne(testUser.serialize().id);
    assert.isOk(foundUser, "findOne should return an truthy value");
    assert.containsAllKeys(
      foundUser,
      userAttributes,
      "found user has all user attributes"
    );
    assert.ownInclude(
      testUser.serialize(),
      foundUser,
      "found user is equal to testUser"
    );
  });

  test.only("userRepository.update should update an user data", async (assert) => {
    const testUser = await UserFactory.create();
    const newTestUserData = await UserFactory.makeStubbed();
    const {
      id,
      createdAt,
      updatedAt,
      ...newData
    } = newTestUserData.serialize();

    console.log(newData);

    const updatedUser = await userRepository.update(
      testUser.serialize().id,
      newData
    );

    console.log(updatedUser);
    assert.isOk(updatedUser);
  });
});
