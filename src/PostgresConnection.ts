import { Pool, PoolConfig, type PoolClient } from "pg";
import { Params } from "../types/main.types";
import { SQLStatement } from "sql-template-strings";

type Result<Data = unknown> = Data | Error;

export default class PostgresConnection<T, U> {
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  static async build<T, U>(
    config: PoolConfig
  ): Promise<PostgresConnection<T, U> | Error | void> {
    let client: PoolClient;
    try {
      const pool = new Pool(config);
      client = await pool.connect();
      return new PostgresConnection(pool);
    } catch (error) {
      console.log(error);
      throw new Error(error?.message);
    } finally {
      if (client) client.release();
    }
  }

  async getQueryResult(
    client: PoolClient,
    queryGenerator: (params: Params | string) => SQLStatement,
    params: Params | string
  ) {
    const query = queryGenerator(params);
    let queryResult: any;
    try {
      queryResult = await client.query(query);
      if (!(queryResult instanceof Error)) {
        return queryResult.rows;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async query(
    queryGenerator: (params: Params | string) => SQLStatement,
    params: Params | string,
    transform?: (values: T[] | U) => U
  ): Promise<Result<T[] | U>> {
    const client = await this.pool.connect();
    let queryResult: T[] | U;
    try {
      queryResult = await this.getQueryResult(client, queryGenerator, params);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      client.release();
    }

    if (queryResult instanceof Error) {
      throw queryResult;
    }

    if (transform == undefined) {
      return queryResult;
    }

    return transform(queryResult);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
