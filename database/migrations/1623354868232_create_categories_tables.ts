import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateCategoriesTables extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name');
      table.string('slug');
      table.string('description');
      table.timestamps();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
