import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateOrderItemsTable extends BaseSchema {
  protected tableName = "order_items";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("product_name");
      table.integer("product_id");
      table.float("unit_price", 8, 2);
      table.integer("quantity");
      table.integer("discount");
      table.float("total", 8, 2);
      table
        .integer("order_id")
        .unsigned()
        .references("orders.id")
        .onDelete("cascade");
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
