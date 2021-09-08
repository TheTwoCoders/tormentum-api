import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  rootDir: 'src',
  setupFiles: ['dotenv/config'],
  preset: '@shelf/jest-mongodb',
  watchPathIgnorePatterns: ['globalConfig'],
}

export default config
