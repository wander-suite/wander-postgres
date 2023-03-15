import { Pool, QueryResult, type PoolClient } from "pg";
import { PoolConfig } from "../types/PostgresConnection.types";
import { Queries, Params } from "../types/main.types";

interface IPostgresConnection {
  pool: Pool;
  queries: Queries;
  query(
    query: string,
    params: any[],
    callback?: (err?: Error, result?: QueryResult<any>) => void
  ): Promise<void>;
  close(): Promise<void>;
}

export default class PostgresConnection {
  pool: Pool;
  queries: Queries;

  constructor(pool: Pool, queries: Queries) {
    this.pool = pool;
    this.queries = queries;
  }

  static async build(config: PoolConfig): Promise<PostgresConnection> {
    let client: PoolClient;
    try {
      const pool = new Pool(config);
      client = await pool.connect();
      return new PostgresConnection(pool, config.queries);
    } catch (error) {
      console.log(error);
      client.release();
    }
  }

  async query(
    sqlQuery: string,
    params: any[],
    callback?: (err?: Error, result?: QueryResult<any>) => void
  ) {
    try {
      const client = await this.pool.connect();
      return client.query(sqlQuery, params, callback);
    } catch (err) {
      console.log(err);
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
