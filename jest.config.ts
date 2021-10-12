import type { Config } from "@jest/types"

const config: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["<rootDir>/**/__tests__/**/*.{ts,tsx}", "<rootDir>/**/*.{spec,test}.{ts,tsx}"],
}

export default config
