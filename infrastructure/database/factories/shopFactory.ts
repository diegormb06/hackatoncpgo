import Factory from "@ioc:Adonis/Lucid/Factory";

import { UserFactory } from "./userFactory";
import Shop from "../Models/Shop";

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
    number: faker.address.zipCode("####"),
    complement: faker.address.secondaryAddress(),
    district: faker.address.county(),
    city: faker.address.city(),
    state: "Goiás",
    country: "Brasil",
  };
})
  .relation("user", () => UserFactory)
  .build();
