import PostgresClient from "../src/PostgresClient";
import PostgresConnection from "../src/PostgresConnection";
import config from "../config/config";
import SQL from "sql-template-strings";

let pool, client;
beforeAll(async () => {
  pool = await PostgresConnection.build(config.postgresConfig);
  client = await PostgresClient.build(config.postgresConfig);
});

afterAll(async () => {
  await client.close();
});

describe("PostgresConnection tests", () => {
  it("should return 1 as answer", async () => {
    const query = () => {
      return SQL`SELECT 1 as answer`;
    };

    const params = {};
    const transform = false;

    const result = await pool.query(query, params, transform);

    expect(result.answer).toBe(1);
  });
});
