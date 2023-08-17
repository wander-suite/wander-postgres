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

afterEach(async () => {
  await client.deleteUser(id);
});

describe("update-user tests", () => {
  it("should return the updated user", async () => {
    const createdUser: Array<CreatedUserResult> = await client.createUser(
      TEST_USER
    );
    id = createdUser[0].id;

    const result: Array<CreatedUserResult> = await client.updateUser({
      id,
      firstName: "test-2",
    });

    const expectedResult: CreatedUserResult = {
      id,
      firstName: "test-2",
      lastName: "test",
      email: "test@testing.com",
    };

    expect(result[0]).toEqual(expectedResult);
  });
});
