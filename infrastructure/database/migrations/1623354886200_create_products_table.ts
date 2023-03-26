import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateProductsTables extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.integer("shop_id").references("shops.id").onDelete("CASCADE");
      table.integer("category_id").references("categories.id");
      table.string("title");
      table.string("description");
      table.decimal("price", 10, 2);
      table.integer("stock_quantity");
      table.integer("stars", 1);
      table.enum("status", ["active", "inactive"]).defaultTo("active");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
