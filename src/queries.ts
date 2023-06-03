import { UserId, UserParams } from "../types/client.types";
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
    "create-user": (user: UserParams) => {
      return SQL`INSERT INTO users ("first_name", "last_name", "email", "password") VALUES (${user.firstName}, ${user.lastName}, ${user.email}, ${user.password}) RETURNING id, first_name as "firstName", last_name as "lastName", email`;
    },
    "update-user": (params: Partial<UserParams & { id: number }>) => {
      return SQL`UPDATE users SET 
      first_name = COALESCE(${params.firstName}, first_name),
      last_name = COALESCE(${params.lastName}, last_name),
      email = COALESCE(${params.email}, email),
      password = COALESCE (${params.password}, password)
      WHERE id = ${params.id}
      RETURNING id, first_name as "firstName", last_name as "lastName", email`;
    },
    "delete-user": (id: UserId) => {
      return SQL`DELETE FROM users WHERE "id" = ${id} RETURNING id`;
    },
  };
};
