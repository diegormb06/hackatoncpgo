import Factory from "@ioc:Adonis/Lucid/Factory";
import Shop from "App/Models/Shop";

export const ShopFactory = Factory.define(Shop, ({ faker }) => {
  return {
    user_id: 1,
    name: faker.company.companyName(),
    phone: faker.company.companyName(),
    mobile_phone: faker.company.companyName(),
    cnpj: faker.company.companyName(),
    logo: faker.image.abstract(),
    zipcode: faker.address.zipCode(),
    address: faker.address.streetAddress(),
    number: faker.datatype.number({ min: 2, max: 4 }),
    complement: faker.address.secondaryAddress(),
    district: faker.address.county(),
    city: faker.address.city(),
    state: "Goiás",
    country: "Brasil",
  };
}).build();
