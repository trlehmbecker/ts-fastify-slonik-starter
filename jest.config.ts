import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["<rootDir>/**/__tests__/**/*.{ts,tsx}", "<rootDir>/**/*.{spec,test}.{ts,tsx}"],
  globalSetup: "<rootDir>/dist/test/global-setup.js",
  globalTeardown: "<rootDir>/dist/test/global-teardown.js",
  preset: "ts-jest",
  testEnvironment: "node",
}

export default config
