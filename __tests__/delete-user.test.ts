import PostgresClient from "../src/PostgresClient";
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
  client = await PostgresClient.build(config.postgresConfig);
});

beforeEach(async () => {
  const result = await client.createUser(TEST_USER);
  id = result[0].id;
});

afterAll(async () => {
  await client.close();
});

describe("delete-user tests", () => {
  it("should delete a user when given its id", async () => {
    const result = await client.deleteUser(id);
    expect(result[0]).toEqual({ id });

    const fetchedResult = await client.fetchUser({ id: [id, "="] });
    expect(fetchedResult).toHaveLength(0);
  });

  it("should throw an error if deletion of the user is unsuccessful", async () => {
    try {
      await client.deleteUser();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
