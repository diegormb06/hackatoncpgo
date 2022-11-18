import Factory from "@ioc:Adonis/Lucid/Factory";
import Order from "App/Models/Order";
import { UserFactory } from "Database/factories/userFactory";
import { AddressFactory } from "Database/factories/addressFactory";
import { OrderStatus } from "App/domain/enums/OrderStatus";

export const OrderFactory = Factory.define(Order, async ({ faker }) => {
  return {
    user_id: (await UserFactory.create()).id,
    ship_address: (await AddressFactory.create()).id,
    freight: 9.99,
    total_value: faker.datatype.float({ precision: 2 }),
    status: faker.random.arrayElement([
      "awaiting",
      "received",
      "delivering",
      "complete",
    ]) as OrderStatus,
  };
}).build();
