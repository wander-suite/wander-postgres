import { Pool, PoolConfig, QueryResultRow } from "pg";
import { queries as psqueries } from "./queries";
import { PostgresQueriesMap } from "./types/main.types";
import { SQLStatement } from "sql-template-strings";
import Logger from "./utils/logger";
import { UserParams, UserId, UserFilters } from "./types/client.types";
import { filterParams } from "./utils/filterParams";

export class PostgresClient {
  private pool: Pool;
  private queries: PostgresQueriesMap;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
    this.queries = psqueries();
  }

  async query<T>(text: string, values: any[]): Promise<QueryResultRow> {
    return this.pool.query(text, values);
  }

  async getQueryResult(
    queryGenerator: (params: any) => SQLStatement,
    params: any,
    transform?: (values: any) => any
  ) {
    const client = await this.pool.connect();
    const query = queryGenerator(params);
    let queryResult: any;
    try {
      queryResult = await client.query(query);
      if (!(queryResult instanceof Error)) {
        return queryResult.rows;
      }
    } catch (error) {
      Logger.error(`Error occurred while querying db: ${error}`);
      if (error instanceof Error) {
        throw error;
      }
    } finally {
      if (client) client.release();
    }

    if (queryResult instanceof Error) {
      throw queryResult;
    }

    if (transform == undefined) {
      return queryResult.rows;
    }

    return transform(queryResult.rows);
  }

  async createUser(user: UserParams) {
    return await this.getQueryResult(this.queries["create-user"], user);
  }

  async fetchUser(filters: UserFilters) {
    const filteredParams = filterParams(filters);
    return await this.getQueryResult(
      this.queries["fetch-user"],
      filteredParams
    );
  }

  async updateUser(params: { id: number } & Partial<UserParams>) {
    return await this.getQueryResult(this.queries["update-user"], params);
  }

  async deleteUser(id: UserId) {
    return await this.getQueryResult(this.queries["delete-user"], id);
  }
}
