import PostgresConnection from "./PostgresConnection";
import { queries as psqueries } from "./queries";
import { Params, PostgresQueriesMap } from "../types/main.types";
import { PoolConfig } from "../types/PostgresConnection.types";
import { filterParams } from "../utils/filterParams";

export interface Filters {
  [k: string]: Array<number | string | boolean>;
}

export interface UserParams extends Params {
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
    await this.connection.close();
  }

  async fetchUser(params: Params) {
    const filterString = filterParams(params);

    return await this.connection.query(
      this.queries["fetch-user"],
      filterString
    );
  }
  async createUser(params: UserParams) {
    return await this.connection.query(this.queries["create-user"], params);
  }

  async deleteUser(id: UserId) {
    return await this.connection.query(this.queries["delete-user"], id);
  }
}
