export interface Params {
  [key: string]: string | number;
}

export type Query = {
  (arg: Params): string;
};

export interface Queries {
  (): {
    [key: string]: Query;
  };
}
