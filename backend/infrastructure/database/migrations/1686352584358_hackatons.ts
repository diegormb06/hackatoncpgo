import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Hackatons extends BaseSchema {
  protected tableName = "hackatons";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("turma").notNullable();
      table.string("serie").notNullable();
      table.boolean("indicios_bullyng");
      table.boolean("indicios_violencia");
      table.enum("risco", ["neutro", "alto", "baixo"]).defaultTo("new");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
