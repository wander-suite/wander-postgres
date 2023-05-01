import { Pool, type PoolClient } from "pg";
import { PoolConfig } from "../types/PostgresConnection.types";
import { Params } from "../types/main.types";
import { SQLStatement } from "sql-template-strings";

type Result<Data = unknown> = Data | Error;

type Query<T, U> = (
  queryGenerator: (params: Params) => SQLStatement,
  params: Params,
  transform?: (values: T[]) => U
) => Promise<Result<U>>;

type GetQueryResult = (
  client: PoolClient,
  queryGenerator: (params: Params) => SQLStatement,
  params: Params
) => Promise<Result<any[] | Error>>;

interface IPostgresConnection<T, U> {
  pool: Pool;
  query: Query<T, U>;
  getQueryResult: GetQueryResult;
  close(): Promise<void>;
}

export default class PostgresConnection<T, U>
  implements IPostgresConnection<T, U>
{
  pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  static async build<T, U>(
    config: PoolConfig
  ): Promise<PostgresConnection<T, U>> {
    let client: PoolClient;
    try {
      console.log(config);
      const pool = new Pool(config);
      client = await pool.connect();
      return new PostgresConnection(pool);
    } catch (error) {
      console.log(error);
      client.release();
    }
  }

  async getQueryResult(
    client: PoolClient,
    queryGenerator: (params: Params) => SQLStatement,
    params: Params
  ) {
    const query = queryGenerator(params);
    let queryResult;
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

  /**
   * Method overloading. The function signatures are being evaluated from the
   * bottom up. At the very bottom, there is a super-flexible, super-open method
   * definition. Building on top of that, we're "clamping" it down to two
   * possibilities - one that handles what happens when the transform callback
   * is passed in, and one that handles when one isn't.
   *
   * If the transform callback isn't provided, we're guaranteed an array of T
   * values, but if a transform callback is passed in, it's going of type U,
   * which could be anything
   */
  async query(
    queryGenerator: (params: Params) => SQLStatement,
    params: Params
  ): Promise<Result<T[]>>;
  async query(
    queryGenerator: (params: Params) => SQLStatement,
    params: Params,
    transform: (values: T[]) => U
  ): Promise<Result<U>>;
  async query(
    queryGenerator: (params: Params) => SQLStatement,
    params: Params,
    transform?: (values: T[]) => U
  ): Promise<Result<T[] | U>> {
    const client = await this.pool.connect();
    let queryResult;
    try {
      queryResult = await this.getQueryResult(client, queryGenerator, params);
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }

    if (queryResult instanceof Error || transform == undefined) {
      return queryResult;
    }

    return transform(queryResult);
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}
