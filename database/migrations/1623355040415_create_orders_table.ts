import BaseSchema from "@ioc:Adonis/Lucid/Schema";
export default class CreateOrdersTables extends BaseSchema {
  protected tableName = "orders";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("user_id").unsigned().references("users.id").notNullable();
      table.integer("ship_address").notNullable();
      table.float("freight", 8, 2).defaultTo(9.99);
      table.float("total_value", 8, 2).notNullable();
      table.integer("total_quantity").notNullable();
      table
        .enum("status", ["new", "received", "delivering", "complete"])
        .defaultTo("new");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
