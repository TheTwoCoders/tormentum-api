import mongoose, { Mongoose } from 'mongoose'

const connect = async (customDbName = ''): Promise<Mongoose> => {
  return mongoose.connect(dbUrl(customDbName))
}

const disconnect = async (connection: Mongoose | null): Promise<void> => {
  if (connection === null) return
  connection.disconnect()
}

const dbUrl = (customDbName: string): string => {
  const mongoUrl = process.env.MONGODB_URL

  if (mongoUrl === undefined) {
    throw Error('You need to set MONGODB_URL env variable')
  }

  return `${mongoUrl}${customDbName}`
}

export { connect, disconnect }
