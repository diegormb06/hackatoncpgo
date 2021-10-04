import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import Hash from "@ioc:Adonis/Core/Hash";

export const UserFactory = Factory.define(User, async ({ faker }) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: await Hash.make("12345678"),
    email: faker.internet.email(),
    role: faker.random.arrayElement(["user", "admin", "store"]),
    cpf: faker.phone.phoneNumber("###.###.###-##"),
    phone: faker.phone.phoneNumber("(62)####-####"),
    photo: faker.image.avatar(),
  };
})
  .state("role", (user) => (user.role = "admin"))
  .build();
