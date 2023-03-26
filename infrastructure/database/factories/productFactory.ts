import Factory from "@ioc:Adonis/Lucid/Factory";
import Product from "App/Models/Product";
import { ShopFactory } from "Database/factories/shopFactory";

export const ProductFactory = Factory.define(Product, async ({ faker }) => {
  return {
    shop_id: (await ShopFactory.create()).id,
    category_id: faker.datatype.number({ min: 1, max: 3 }),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.finance.amount(),
    stock_quantity: faker.datatype.number({ max: 100 }),
    stars: faker.datatype.number({ max: 5, min: 1 }),
    status: faker.random.arrayElement([
      "await",
      "open",
      "delivering",
      "complete",
    ]),
  };
})
  .relation("shop", () => ShopFactory)
  .build();
