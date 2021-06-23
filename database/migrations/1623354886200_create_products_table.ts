import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProductsTables extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('shop_id').unsigned()
      table.integer('category_id').unsigned()
      table.string('title');
      table.string('description');
      table.float('price');
      table.integer('stock_quantity');
      table.integer('stars',1);
      table.enum('status', ['active', 'inactive']);
      table.timestamps();

      table.foreign('category_id').references('id').inTable('categories');
      table.foreign('shop_id').references('id').inTable('shops').onDelete('cascade');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}