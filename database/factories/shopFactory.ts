import Factory from "@ioc:Adonis/Lucid/Factory";
import Shop from "App/Models/Shop";
import { UserFactory } from "Database/factories/userFactory";

export const ShopFactory = Factory.define(Shop, async ({ faker }) => {
  return {
    name: faker.company.companyName(),
    user_id: (await UserFactory.create()).id,
    phone: faker.phone.phoneNumber("(62)3#######"),
    mobile_phone: faker.phone.phoneNumber("(6#)9#######"),
    cnpj: faker.phone.phoneNumber("##.###.###/0001-##"),
    logo: faker.image.abstract(),
    zipcode: faker.address.zipCode("7####-###"),
    address: faker.address.streetAddress(),
    number: faker.datatype.number({ min: 10, max: 4 }),
    complement: faker.address.secondaryAddress(),
    district: faker.address.county(),
    city: faker.address.city(),
    state: "Goiás",
    country: "Brasil",
  };
}).build();
