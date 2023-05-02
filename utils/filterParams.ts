import { snakeCase } from "lodash";
import { Params } from "../types/main.types";

export const filterParams = (params: Params): string => {
  const base = ` WHERE `;

  const filterQuery = Object.entries(params).map(([key, value]) => {
    const convertedValue =
      typeof value[0] === "string" ? `"${value[0]}"` : value[0];
    return `${snakeCase(key)}${value[1]}${convertedValue}`;
  });

  const joinedFilters = filterQuery.join(` AND `);
  return base.concat(joinedFilters);
};
