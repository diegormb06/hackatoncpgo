import Factory from "@ioc:Adonis/Lucid/Factory";
import { OrderFactory } from "Database/factories/orderFactory";
import { ProductFactory } from "Database/factories/productFactory";
import OrderItem from "App/Models/OrderItem";

export const OrderItemFactory = Factory.define(OrderItem, async ({ faker }) => {
  const product = await ProductFactory.create();
  const qty = faker.datatype.number({ min: 0, max: 999 });
  return {
    order_id: (await OrderFactory.create()).id,
    product_id: product.id,
    product_name: product.title,
    unit_price: 9.99,
    quantity: qty,
    discount: 10,
    total: qty * 9.99,
    status: faker.random.arrayElement([
      "awaiting",
      "received",
      "delivering",
      "complete",
    ]),
  };
}).build();
