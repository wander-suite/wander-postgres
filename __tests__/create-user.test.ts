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

afterEach(async () => {
  await client.deleteUser(id);
});

// afterAll(async () => {
//   await client.close();
// });

describe("create-user tests", () => {
  it.skip("should throw an error if creation of the user is unsuccessful", async () => {
    await expect(client.createUser()).toThrow();
  });

  it("should create a user and return the user along with its id", async () => {
    const result: Array<CreatedUserResult> = await client.createUser(TEST_USER);
    id = result[0].id;

    const expectedResult: CreatedUserResult = {
      id,
      firstName: "test",
      lastName: "test",
      email: "test@testing.com",
    };

    expect(result[0]).toEqual(expectedResult);
  });
});
