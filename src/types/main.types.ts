import { SQLStatement } from "sql-template-strings";

export type Params =
  | {
      [key: string]: string | number;
    }
  | string
  | number;

export type ParamsObject = {
  [key: string]: string | number;
};

export type Query = {
  (arg: Params): typeof SQLStatement;
};

export interface PostgresQueriesMap {
  [key: string]: (arg: any) => SQLStatement;
}

export interface PostgresQueries {
  (): PostgresQueriesMap;
}
