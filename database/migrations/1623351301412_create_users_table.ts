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
      table.string("cpf", 11).unique().notNullable();
      table.string("phone", 11);
      table.string("photo");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
