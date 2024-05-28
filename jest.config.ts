module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>src/__tests__/**/*.test.ts"],
  setupFiles: ["dotenv/config"],
};
