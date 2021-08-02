import Factory from "@ioc:Adonis/Lucid/Factory";
import Address from "App/Models/Address";
import { UserFactory } from "Database/factories/userFactory";

export const AddressFactory = Factory.define(Address, async ({ faker }) => {
  return {
    userId: (await UserFactory.create()).id,
    zipcode: faker.address.zipCode("7####-###"),
    address: faker.address.streetAddress(),
    number: faker.address.zipCode("####"),
    complement: faker.address.secondaryAddress(),
    district: faker.address.county(),
    city: faker.random.arrayElement(["Goiânia", "Aparecida de Goiânia"]),
    state: "Goiás",
    country: "Brasil",
  };
}).build();
