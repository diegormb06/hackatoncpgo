import Factory from "@ioc:Adonis/Lucid/Factory";
import Order from "Infrastructure/database/Models/Order";
import { OrderStatus } from "domain/enums/OrderStatus";
import { UserFactory } from "./userFactory";
import { AddressFactory } from "./addressFactory";

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
