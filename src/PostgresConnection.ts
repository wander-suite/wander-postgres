import { Pool } from "pg";
import { PoolConfig } from "../types/PostgresConnection.types";
import { Queries } from "../types/main.types";

export default class PostgresConnection {
  pool: Pool;
  queries: Queries;

  constructor(pool: Pool, queries: Queries) {
    this.pool = pool;
    this.queries = queries;
  }

  static async build(config: PoolConfig) {
    let client;
    try {
      const pool = new Pool(config);
      client = await pool.connect();
      return new PostgresConnection(pool, config.queries);
    } catch (error) {
      console.log(error);
      client.release();
    }
  }

  async query(sqlQuery: string, params: any, callback: any) {
    const client = await this.pool.connect();
    return client.query(sqlQuery, params, callback);
  }

  async close() {
    await this.pool.end();
  }
}
