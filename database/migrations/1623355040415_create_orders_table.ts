import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateOrdersTables extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("users.id");
      table.integer("ship_address").unsigned().references("addresses.id");
      table.float("freight", 8, 2).defaultTo(9.99);
      table.float("total_value", 8, 2).notNullable();
      table
        .enum("status", ["awaiting", "received", "delivering", "complete"])
        .defaultTo("awaiting");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
