import { ParamsObject } from "./main.types";

export interface Filters {
  [k: string]: Array<number | string | boolean>;
}

export interface UserParams extends ParamsObject {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type UserFilters = {
  id?: [number, string];
  firstName?: [string, string];
  lastName?: [string, string];
  email?: [string, string];
  dateOfBirth?: [string, string];
};

export type UserId = {
  id: number;
};
