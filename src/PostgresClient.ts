import PostgresConnection from "./PostgresConnection";
import { queries as psqueries } from "./queries";
import { PostgresQueriesMap } from "../types/main.types";
import { UserFilters, UserId, UserParams } from "../types/client.types";
import { PoolConfig, Connection } from "pg";
import { filterParams } from "../utils/filterParams";

export default class PostgresClient<T, U> {
  constructor(
    private connection: PostgresConnection<T, U>,
    private queries: PostgresQueriesMap
  ) {
    this.connection = connection;
    this.queries = queries;
  }

  static async build(config: PoolConfig) {
    const postgresQueries: PostgresQueriesMap = { ...psqueries() };

    const connection = (await PostgresConnection.build(
      config
    )) as PostgresConnection<any, any>;

    return new PostgresClient(connection, postgresQueries);
  }

  async close() {
    await this.connection.close();
  }

  async fetchUser(filters: UserFilters) {
    const filterString = filterParams(filters);

    return await this.connection.query(
      this.queries["fetch-user"],
      filterString
    );
  }
  async createUser(user: UserParams) {
    return await this.connection.query(this.queries["create-user"], user);
  }

  async updateUser(params: Partial<UserParams & { id: number }>) {
    return await this.connection.query(this.queries["update-user"], params);
  }

  async deleteUser(id: UserId) {
    return await this.connection.query(this.queries["delete-user"], id);
  }
}
