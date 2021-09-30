import test from "japa";
import UserRepository from "App/repository/UserRepository";
import { UserFactory } from "Database/factories/userFactory";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
const userRepository = new UserRepository();

const userAttributes = [
  "id",
  "first_name",
  "last_name",
  "email",
  "cpf",
  "phone",
  "full_name",
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
    const { first_name, last_name, email, cpf, phone } = newUser.serialize();
    const createdUser = await userRepository.create({
      first_name,
      last_name,
      email,
      cpf,
      phone,
      password: "12345678",
    });

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
    const foundUser = await userRepository.findOne(testUser.id);

    assert.isOk(foundUser, "findOne should return an truthy value");
    assert.equal(testUser.id, foundUser.id, "found user is equal to testUser");
  });

  test("userRepository.update should update an user data", async (assert) => {
    const testUser = await UserFactory.create();
    const newTestUserData = await UserFactory.makeStubbed();
    const { updatedAt, password, full_name, ...newData } =
      newTestUserData.serialize();
    const updatedUser = await userRepository.update(testUser.id, newData);

    assert.isOk(updatedUser);
    assert.ownInclude(updatedUser.serialize(), newData);
  });

  test("userRepository.delete should delete a user", async (assert) => {
    const testUser = await UserFactory.create();
    const deleteResponse = await userRepository.delete(testUser.id);
    const tryFindUser = await User.find(testUser.id);
    assert.ownInclude(deleteResponse, { message: `deleted with success` });
    assert.isNull(tryFindUser);
  });
});
