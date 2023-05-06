import { snakeCase } from "lodash";
import { UserFilters } from "../types/client.types";

export const filterParams = (params: UserFilters): string => {
  const base = ` WHERE `;

  const filterQuery = Object.entries(params).map(([key, value]) => {
    const convertedValue =
      typeof value[0] === "string" ? `"${value[0]}"` : value[0];
    return `${snakeCase(key)}${value[1]}${convertedValue}`;
  });

  const joinedFilters = filterQuery.join(` AND `);
  return base.concat(joinedFilters);
};
