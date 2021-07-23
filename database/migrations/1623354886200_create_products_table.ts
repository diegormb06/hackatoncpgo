import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateProductsTables extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("shop_id");
      table.integer("category_id");
      table.string("title");
      table.string("description");
      table.decimal("price", 10, 2);
      table.integer("stock_quantity");
      table.integer("stars", 1);
      table.enum("status", ["await", "open", "delivering", "complete"]);
      table.timestamps();

      table.foreign("category_id").references("id").inTable("categories");
      table.foreign("shop_id").references("id").inTable("shops");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
