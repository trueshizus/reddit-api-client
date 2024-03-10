import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest",
  },
};

export default config;
