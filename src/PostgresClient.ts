import PostgresConnection from "PostgresConnection";
import { queries as psqueries } from "queries";
import { Params, PostgresQueriesMap } from "../types/main.types";
import { PoolConfig } from "../types/PostgresConnection.types";

interface NewUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default class PostgresClient<T, U> {
  connection: PostgresConnection<T, U>;
  queries: PostgresQueriesMap;

  constructor(
    connection: PostgresConnection<T, U>,
    queries: PostgresQueriesMap
  ) {
    this.connection = connection;
    this.queries = queries;
  }

  static async build(config: PoolConfig) {
    const postgresQueries: PostgresQueriesMap = { ...psqueries() };
    const connection = await PostgresConnection.build(config);

    return new PostgresClient(connection, postgresQueries);
  }

  async close() {
    return this.connection.close();
  }

  async createUser(params: Params) {
    const response = await this.connection.query(
      this.queries["create-user"],
      params
    );

    if (!response.ok) {
      return response;
    }
  }
}
