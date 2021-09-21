import UserNotFound from '@domain/exceptions/UserNotFound'
import { deleteAllUsers } from '@domain/repositories/UserRepository'
import { connectMemoryDb, disconnectMemoryDb, TestDbConnection } from '@testHelpers/memoryDatabase'
import mockUser from '@testHelpers/mockUser'
import getUser from '../getUser'

describe('Use Case: getUser', () => {
  let connection: TestDbConnection | null = null

  beforeAll(async () => {
    connection = await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb(connection)
  })

  beforeEach(async () => {
    await deleteAllUsers()
  })

  describe('when passing a valid Id', () => {
    it('return user info', async () => {
      const user = await mockUser()

      const foundUser = await getUser(user.id)
      await expect(foundUser.email).toEqual(user.email)
    })
  })

  describe('when passing an invalid Id', () => {
    it('throws UserNotFound', async () => {
      await expect(getUser('613c27a391f7b2af947b3c33')).rejects.toThrow(UserNotFound)
    })
  })
})
