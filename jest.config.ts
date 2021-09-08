import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  rootDir: 'src',
  setupFiles: ['dotenv/config']
}

export default config
