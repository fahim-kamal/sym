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
}