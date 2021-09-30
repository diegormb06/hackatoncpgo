import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: "12345678",
    email: faker.internet.email(),
    cpf: faker.phone.phoneNumber("###.###.###-##"),
    phone: faker.phone.phoneNumber("(62)####-####"),
    photo: faker.image.avatar(),
  };
}).build();
