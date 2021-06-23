import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateOrdersTables extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned()
      table.integer('address_id').unsigned()
      table.float('freight', 8, 2).defaultTo(9.99);
      table.float('total_value', 8, 2).notNullable();
      table.enum('status', ['awaiting', 'received', 'delivering', 'complete']).defaultTo('awaiting')
      table.timestamps();

      table.foreign('user_id').references('id').inTable('users')
      table.foreign('address_id').references('id').inTable('addresses')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
