import { Pool, type PoolClient } from "pg";
import PostgresConnection from "PostgresConnection";
import { queries } from "queries";
import { Params, Queries } from "../types/main.types";
import { PoolConfig } from "../types/PostgresConnection.types";

interface PostgresQueries {
  [key: string]: (args: Params) => string;
}

export default class PostgresClient {
  connection: PoolClient;
  queries: PostgresQueries;

  constructor(connection: PoolClient, queries: Queries) {
    this.connection = connection;
    this.queries = queries();
  }

  static async build(config: PoolConfig) {
    const postgresQueries: PostgresQueries = { ...queries() };
    const connection = await PostgresConnection.build(config);

    return new PostgresClient(connection, postgresQueries);
  }
}
