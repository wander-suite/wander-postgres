import { Params } from "../types/main.types";

export const queries = () => {
  return {
    "create-user": (params: Params) => {
      return `INSERT INTO USER u ("firstName", "lastName", "email", "password") VALUES (${params.firstName}, ${params.lastName}, ${params.age}, ${params.email}, ${params.password}) RETURNING "id", "firstName", "lastName", "email"`;
    },
  };
};
