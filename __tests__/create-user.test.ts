import PostgresClient, { NewUserParams, UserId } from "../src/PostgresClient";
import config from "../config/config";

let client, id;

interface UserResult extends NewUserParams {
  id: number;
}
beforeAll(async () => {
  client = await PostgresClient.build(config.postgresConfig);
});

// afterEach(async () => {
//   client.deleteUser(id);
// });

afterAll(async () => {
  client.close();
});

describe("create-user tests", () => {
  it("should throw an error if creation of the user is unsuccessful", async () => {
    expect(true).toBeTruthy();
  });

  it("should create a user and return the user along with its id", async () => {
    const newUser: NewUserParams = {
      firstName: "test",
      lastName: "test",
      email: "testing@test.com",
      password: "test123",
    };

    const result: UserResult = await client.createUser(newUser);
    expect(result).toEqual(newUser);
    expect(result).toEqual({ id: 1, ...newUser });
  });
});
