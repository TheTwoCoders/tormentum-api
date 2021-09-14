import { Mongoose } from 'mongoose'
import register from '@use_cases/register'
import { connect, disconnect } from '@database/database'
import UserDuplicated from '@exceptions/UserDuplicated'
import { findUserByEmail } from '@repositories/UserRepository'

describe('Use Case: Register', () => {
  let connection: Mongoose | null = null

  beforeAll(async () => {
    connection = await connect(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await disconnect(connection)
  })

  describe('when passing a non registered email', () => {
    it('returns the registered user', async () => {
      const username = 'John'
      const email = 'john@gmail.com'
      const password = '123456'

      await register(username, email, password)

      const user = await findUserByEmail(email)
      expect(user).not.toBeNull()
    })
  })

  describe('when passing an already registered email', () => {
    it('throws UserDuplicated', async () => {
      const username = 'John'
      const email = 'john2@gmail.com'
      const password = '123456'

      await register(username, email, password)

      await expect(register(username, email, password))
        .rejects
        .toThrow(UserDuplicated)
    })
  })
})
