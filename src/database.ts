import mongoose from 'mongoose'

const connect = async (): Promise<void> => {
  await mongoose.connect(dbUrl())

  console.log(`⚡️[tormentum-api]: Connected to MongoDB`)
}

const dbUrl = (): string => {
  const mongoUrl = process.env.MONGODB_URL
  if (mongoUrl === undefined) {
    throw Error('You need to set MONGODB_URL env variable')
  }

  return mongoUrl
}

export { connect }
