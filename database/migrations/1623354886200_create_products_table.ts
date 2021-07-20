import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateProductsTables extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.foreign("shop_id");
      table.foreign("category_id");
      table.string("title");
      table.string("description");
      table.float("price");
      table.integer("stock_quantity");
      table.integer("stars", 1);
      table.enum("status", ["await", "open", "delivering", "complete"]);
      table.timestamps();
      table.foreign("category_id").references("id").inTable("categories");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
