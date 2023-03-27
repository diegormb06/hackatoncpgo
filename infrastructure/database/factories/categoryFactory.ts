import Factory from "@ioc:Adonis/Lucid/Factory";
import Category from "Infrastructure/database/Models/Category";

export const CategoryFactory = Factory.define(Category, ({ faker }) => {
  return {
    name: faker.lorem.word(),
    slug: faker.lorem.slug(2),
    description: faker.lorem.sentence(),
  };
}).build();
