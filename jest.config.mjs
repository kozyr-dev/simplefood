import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    // test coverage for all files in the features directory, except test files
    "src/features/**/*.{ts,tsx}",
    "!src/features/**/*.test.{ts,tsx}",
  ],
  coverageThreshold: {
    // optional: fail the run if coverage drops below
    //global: { lines: 80 },
  },
};

export default createJestConfig(config);
