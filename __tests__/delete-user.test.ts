import { PostgresClient } from "../src/PostgresClient";
import { TEST_USER } from "../common.data";
import config from "../config/config";

let client, id;

interface CreatedUserResult {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

beforeAll(async () => {
  client = new PostgresClient(config.postgresConfig);
});

beforeEach(async () => {
  const result = await client.createUser(TEST_USER);
  id = result[0].id;
});

describe("delete-user tests", () => {
  it("should delete a user when given its id", async () => {
    const result = await client.deleteUser(id);
    expect(result[0]).toEqual({ id });

    const fetchedResult = await client.fetchUser({ id: [id, "="] });
    expect(fetchedResult).toHaveLength(0);
  });
});
