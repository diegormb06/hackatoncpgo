import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateAddressesTable extends BaseSchema {
  protected tableName = "addresses";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
      table.string("address").notNullable();
      table.string("zipcode").notNullable();
      table.string("number", 6);
      table.string("complement");
      table.string("district");
      table.string("city", 50);
      table.string("state");
      table.string("country");
      table.boolean("is_primary");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
