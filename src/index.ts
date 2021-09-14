import dotenv from 'dotenv'
import { startServer } from '@infra/server/server'
import { connect } from '@infra/database/database'

const init = async () => {
  dotenv.config()
  startServer()
  await connect()
  console.log('⚡️[tormentum-api]: Connected to MongoDB')
}

init()
