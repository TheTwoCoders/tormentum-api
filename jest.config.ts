/* eslint-disable @typescript-eslint/no-var-requires */
import type { InitialOptionsTsJest } from 'ts-jest/dist/types'

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  rootDir: 'src',
  setupFiles: ['dotenv/config'],
  watchPathIgnorePatterns: ['globalConfig'],
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/application/$1',
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@testHelpers/(.*)$': '<rootDir>/testHelpers/$1',
  },
}

export default config
