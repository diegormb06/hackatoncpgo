import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateProductImagesTable extends BaseSchema {
  protected tableName = 'product_images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('product_id').unsigned()
      table.string('path');
      table.timestamps();

      table.foreign('product_id').references('id').inTable('products').onDelete('cascade');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
