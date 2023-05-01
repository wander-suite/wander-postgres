import PostgresConnection from "./PostgresConnection";
import { queries as psqueries } from "./queries";
import { Params, PostgresQueriesMap } from "../types/main.types";
import { PoolConfig } from "../types/PostgresConnection.types";

export interface NewUserParams extends Params {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserId = {
  id: number;
};

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

  async createUser(params: NewUserParams) {
    return await this.connection.query(this.queries["create-user"], params);
  }

  async deleteUser(params: UserId) {
    return await this.connection.query(this.queries["delete-user"], params);
  }
}
