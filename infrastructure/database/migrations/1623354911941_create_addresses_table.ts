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
        .onDelete("CASCADE")
        .notNullable();
      table.string("address").notNullable();
      table.string("zipcode", 8).notNullable();
      table.string("number", 6);
      table.string("complement");
      table.string("neighborhood", 50);
      table.string("city", 50);
      table.string("state", 50).defaultTo("Goiás");
      table.string("country", 50).defaultTo("Brasil");
      table.boolean("is_primary").defaultTo(false);
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
