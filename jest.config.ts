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
    '^@application/(.*)$': '<rootDir>/application/$1',
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@exceptions/(.*)$': '<rootDir>/exceptions/$1',
    '^@infra/(.*)$': '<rootDir>/infra/$1',
    '^@server/(.*)$': '<rootDir>/server/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
  },
  transform: {
    ...tsjPreset.transform,
  }
}

export default config
