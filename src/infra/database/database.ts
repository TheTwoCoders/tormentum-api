import mongoose, { Mongoose, ConnectOptions } from 'mongoose'

const connect = async (
  dbUrl: string | undefined = process.env.MONGODB_URL,
): Promise<Mongoose> => {
  if (dbUrl === undefined) {
    throw Error('You need to set MONGODB_URL env variable')
  }

  return mongoose.connect(
    dbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions
  )
}

const disconnect = async (connection: Mongoose | null): Promise<void> => {
  if (connection === null) return
  await connection.disconnect()
}

export { connect, disconnect }
