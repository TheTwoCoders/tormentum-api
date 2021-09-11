import dotenv from 'dotenv'
import { startServer } from './server'
import { connect } from './database'

const init = async () => {
  dotenv.config()
  startServer()
  await connect()
  console.log('⚡️[tormentum-api]: Connected to MongoDB')
}

init()
