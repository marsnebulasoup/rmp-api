import type { Config } from '@jest/types';

module.exports = async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testRegex: "/test/.*\\.test\\.ts$",
    transform: {
      "^.+\\.(t|j)sx?$": "ts-jest"
    },
    collectCoverageFrom: [
      'src/**/*.ts'
    ],
    setupFilesAfterEnv: ["jest-extended/all"]
  };
};