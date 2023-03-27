import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateShopsTable extends BaseSchema {
  protected tableName = "shops";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("payment_account").unique().nullable();
      table.integer("user_id").references("users.id");
      table.string("name").unique();
      table.string("phone", 14);
      table.string("mobile_phone").nullable();
      table.string("cnpj", 18).unique();
      table.string("logo").nullable();
      table.string("zipcode", 10);
      table.string("address");
      table.string("number");
      table.string("complement").nullable();
      table.string("neighborhood", 50);
      table.string("city", 50);
      table.string("state").defaultTo("GO");
      table.string("country").defaultTo("Brasil");
      table.enum("status", ["active", "inactive"]).defaultTo("inactive");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}