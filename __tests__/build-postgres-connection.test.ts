import PostgresClient from "../src/PostgresClient";
import PostgresConnection from "../src/PostgresConnection";
import config from "../config/config";
import SQL from "sql-template-strings";

let pool;
beforeAll(async () => {
  pool = await PostgresConnection.build(config.postgresConfig);
});

describe("PostgresConnection tests", () => {
  it("should return 1 as answer", async () => {
    const query = () => {
      return SQL`SELECT 1 as answer`;
    };

    const params = {};

    const result = await pool.query(query, params);
    expect(result[0].answer).toBe(1);
  });
});
