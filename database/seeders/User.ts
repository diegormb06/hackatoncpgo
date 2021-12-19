import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { UserFactory } from "Database/factories/userFactory";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await UserFactory.apply("role").create();
    await UserFactory.createMany(2);
  }
}
