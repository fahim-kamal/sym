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
