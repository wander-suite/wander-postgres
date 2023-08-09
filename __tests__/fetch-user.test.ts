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
  client = await PostgresClient.build(config.postgresConfig);
});

afterEach(async () => {
  await client.deleteUser(id);
});

afterAll(async () => {
  await client.close();
});

describe("fetch-user tests", () => {
  it("should create fetch a user given its id", async () => {
    const createdUser: Array<CreatedUserResult> = await client.createUser(
      TEST_USER
    );
    id = createdUser[0].id;

    const result: Array<CreatedUserResult> = await client.fetchUser({
      id: [id, "="],
    });

    const expectedResult: CreatedUserResult = {
      id,
      firstName: "test",
      lastName: "test",
      email: "test@testing.com",
    };

    expect(result[0]).toEqual(expectedResult);
  });
});
