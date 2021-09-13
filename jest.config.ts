/* eslint-disable @typescript-eslint/no-var-requires */
import type { Config } from '@jest/types'
import { defaults as tsjPreset } from 'ts-jest/presets'

const mongoDbPrests = require('@shelf/jest-mongodb/jest-preset')

const config: Config.InitialOptions = {
  ...mongoDbPrests,
  rootDir: 'src',
  setupFiles: ['dotenv/config'],
  watchPathIgnorePatterns: ['globalConfig'],
  transform: {
    ...tsjPreset.transform,
  }
}

export default config
