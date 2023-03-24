import { SQLStatement } from "sql-template-strings";

export interface Params {
  [key: string]: string | number;
}

export type Query = {
  (arg: Params): typeof SQLStatement;
};

export interface PostgresQueriesMap {
  [key: string]: (arg: Params) => SQLStatement;
}

export interface PostgresQueries {
  (): PostgresQueriesMap;
}
