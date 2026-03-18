const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-fixed-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();

  return {
    ...config,
    transformIgnorePatterns: [
      "/node_modules/(?!(msw|until-async)/)",
    ],
  };
};