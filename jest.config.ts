import type { Config } from "@jest/types";

const testConfig: Config.InitialOptions = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

export default testConfig;
