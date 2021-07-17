import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(8),
    email: faker.internet.email(),
    cpf: faker.phone.phoneNumber("###.###.###-##"),
    phone: faker.phone.phoneNumber("(62)####-####"),
    photo: faker.image.avatar(),
  };
}).build();
