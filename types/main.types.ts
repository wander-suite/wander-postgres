export interface Params {
  [key: string]: string | number;
}

export type Query = {
  (arg: Params): string;
};

export interface PostgresQueriesMap {
  [key: string]: (arg: Params) => string;
}

export interface PostgresQueries {
  (): PostgresQueriesMap;
}
