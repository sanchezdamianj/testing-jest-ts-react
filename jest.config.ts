export default {
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test|tests).[tj]s?(x)",
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
