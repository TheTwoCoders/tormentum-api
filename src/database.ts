import mongoose from 'mongoose'

async function connect() {
  const dbUrl: string = process.env.MONGODB_URL!

  await mongoose.connect(dbUrl)
  // tslint:disable-next-line: no-console
  console.log(`⚡️[tormentum-api]: Connected to MongoDB`)
}

export { connect }
