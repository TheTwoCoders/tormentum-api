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

async function connectMemoryDb(): Promise<TestDbConnection> {
  const memoryServer = await MongoMemoryServer.create()
  const mongooseConnection = await connect(memoryServer.getUri())

  return new TestDbConnection(mongooseConnection, memoryServer)
}

async function disconnectMemoryDb(connection: TestDbConnection | null): Promise<void> {
  if (connection == null) return

  await disconnect(connection.mongooseConnection)
  await connection.memoryServer.stop()
}

export { connectMemoryDb, disconnectMemoryDb, TestDbConnection }
