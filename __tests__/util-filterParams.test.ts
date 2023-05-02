import { filterParams } from "../utils/filterParams";

describe("filterParams tests", () => {
  it("should create a string with the ", async () => {
    const localParams = {
      id: [1, "="],
      firstName: ["giuseppe", "="],
      dateOfBirth: ["2023-01-01", ">"],
    };
    const result: string = filterParams(localParams);

    const expectedResult = ` WHERE id=1 AND first_name="giuseppe" AND date_of_birth>"2023-01-01"`;

    expect(result).toBe(expectedResult);
  });
});
