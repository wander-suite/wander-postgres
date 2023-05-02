import { UserId } from "PostgresClient";
import { Params } from "../types/main.types";
import { SQL } from "sql-template-strings";

export const queries = () => {
  return {
    "fetch-user": (filters: string) => {
      const base = SQL`SELECT id, first_name as "firstName", last_name as "lastName", email FROM users`;
      if (filters) {
        base.append(filters);
      }

      return base;
    },

    "create-user": (params: Params) => {
      return SQL`INSERT INTO users ("first_name", "last_name", "email", "password") VALUES (${params.firstName}, ${params.lastName}, ${params.email}, ${params.password}) RETURNING id, first_name as "firstName", last_name as "lastName", email`;
    },
    "delete-user": (id: UserId) => {
      return SQL`DELETE FROM users WHERE "id" = ${id} RETURNING id`;
    },
  };
};
