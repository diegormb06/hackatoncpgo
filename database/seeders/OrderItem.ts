import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { OrderItemFactory } from "Database/factories/orderItemFactory";

export default class OrderItemSeeder extends BaseSeeder {
  public async run() {
    // await OrderItemFactory.createMany(10);
  }
}
