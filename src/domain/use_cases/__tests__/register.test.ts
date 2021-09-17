import register from '@domain/use_cases/register'
import UserDuplicated from '@domain/exceptions/UserDuplicated'
import { findUserByEmail } from '@domain/repositories/UserRepository'
import {
  connectMemoryDb,
  disconnectMemoryDb,
  TestDbConnection
} from '@testHelpers/memoryDatabase'

describe('Use Case: Register', () => {
  let connection: TestDbConnection | null = null

  beforeAll(async () => {
    connection = await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb(connection)
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
