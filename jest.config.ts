/* eslint-disable @typescript-eslint/no-var-requires */
import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
import { defaults as tsjPreset } from 'ts-jest/presets'

const mongoDbPrests = require('@shelf/jest-mongodb/jest-preset')

const config: InitialOptionsTsJest = {
  ...mongoDbPrests,
  rootDir: 'src',
  setupFiles: ['dotenv/config'],
  watchPathIgnorePatterns: ['globalConfig'],
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/controllers/$1',
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@exceptions/(.*)$': '<rootDir>/exceptions/$1',
    '^@routes/(.*)$': '<rootDir>/routes/$1',
    '^@database/(.*)$': '<rootDir>/database/$1',
    '^@repositories/(.*)$': '<rootDir>/repositories/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@resources/(.*)$': '<rootDir>/resources/$1',
    '^@use_cases/(.*)$': '<rootDir>/use_cases/$1',
  },
  transform: {
    ...tsjPreset.transform,
  }
}

export default config
