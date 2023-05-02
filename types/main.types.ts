import { SQLStatement } from "sql-template-strings";

export interface Params {
  [key: string]: any;
}

export type Query = {
  (arg: Params): typeof SQLStatement;
};

export interface PostgresQueriesMap {
  [key: string]: (arg: Params | string) => SQLStatement;
}

export interface PostgresQueries {
  (): PostgresQueriesMap;
}
