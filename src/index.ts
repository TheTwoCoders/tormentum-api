import dotenv from 'dotenv'
import { startServer } from '@server/server'
import { connect } from '@database/database'

const init = async () => {
  dotenv.config()
  startServer()
  await connect()
  console.log('⚡️[tormentum-api]: Connected to MongoDB')
}

init()
