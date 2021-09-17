import { connect, disconnect } from '@infra/database/database'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Mongoose } from 'mongoose'

class TestDbConnection {
  mongooseConnection: Mongoose
  memoryServer: MongoMemoryServer

  constructor(mongooseConnection: Mongoose, memoryServer: MongoMemoryServer) {
    this.mongooseConnection = mongooseConnection
    this.memoryServer = memoryServer
  }
}

const connectMemoryDb = async (): Promise<TestDbConnection> => {
  const memoryServer = await MongoMemoryServer.create()
  const mongooseConnection = await connect(memoryServer.getUri())

  return new TestDbConnection(mongooseConnection, memoryServer)
}

const disconnectMemoryDb = async (
  connection: TestDbConnection | null
): Promise<void> => {
  if (connection == null) return

  await disconnect(connection.mongooseConnection)
  await connection.memoryServer.stop()
}

export { connectMemoryDb, disconnectMemoryDb, TestDbConnection }
