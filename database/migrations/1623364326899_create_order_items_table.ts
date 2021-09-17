import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateOrderItemsTable extends BaseSchema {
  protected tableName = "order_items";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("order_id").unsigned();
      table.integer("product_id").unsigned();
      table.string("title");
      table.float("unit_price", 8, 2);
      table.integer("quantity");
      table.integer("discount");
      table.float("total", 8, 2);
      table
        .enum("status", ["awaiting", "received", "delivering", "complete"])
        .defaultTo("awaiting");
      table.timestamps();

      table
        .foreign("order_id")
        .references("id")
        .inTable("orders")
        .onDelete("cascade");
      table.foreign("product_id").references("id").inTable("products");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
