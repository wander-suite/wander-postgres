import { Params } from "../types/main.types";
import { SQL } from "sql-template-strings";

export const queries = () => {
  return {
    "create-user": (params: Params) => {
      return SQL`INSERT INTO USER u ("firstName", "lastName", "email", "password") VALUES (${params.firstName}, ${params.lastName}, ${params.email}, ${params.password}) RETURNING "id", "firstName", "lastName", "email"`;
    },
    "delete-user": (params: Params) => {
      return SQL`DELETE FROM USER u WHERE id = ${params.id}`;
    },
  };
};
