import { Client, InStatement } from "@libsql/client";

export class DatabaseAdapter {
  databaseClient: Client;

  constructor(client: Client) {
    this.databaseClient = client;
  }

  /**
   * Returns the first object from the query
   *
   */
  async queryFirst(stmt: InStatement) {
    return this.databaseClient.execute(stmt).then((res) => {
      return res.rows[0];
    }) as any;
  }

  async queryMany(stmt: InStatement) {
    return this.databaseClient.execute(stmt).then((res) => res.rows) as any;
  }

  async batchAndReturnObjects(stmts: Array<InStatement>) {
    return this.databaseClient
      .batch(stmts)
      .then((resArr) => resArr.map((res) => res.rows as Array<any>));
  }

  createInsertString(entity: object) {
    const fields = Object.keys(entity);
    const fieldsString = "(" + fields.join(", ") + ")";

    const namedPlaceholders = fields.map((field) => ":" + field);
    const namedPlaceholdersString = "(" + namedPlaceholders.join(", ") + ")";

    return fieldsString + " VALUES " + namedPlaceholdersString;
  }

  createUpdateString(entity: object) {
    const fields = Object.keys(entity);
    const updateString = fields
      .map((field) => field + " = " + ":" + field)
      .join(", ");
    return updateString;
  }
}
