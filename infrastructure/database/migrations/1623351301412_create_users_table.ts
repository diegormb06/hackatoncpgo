import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class CreateUsersTable extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.string("cpf", 14).unique().notNullable();
      table.string("phone", 14).notNullable();
      table.string("photo");
      table.enum("role", ["store", "admin", "user"]).defaultTo("user");
      table.timestamps();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
