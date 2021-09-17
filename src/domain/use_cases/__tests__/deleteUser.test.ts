import UserNotFound from '@domain/exceptions/UserNotFound'
import { deleteAllUsers, findUserById } from '@domain/repositories/UserRepository'
import deleteUser from '@domain/use_cases/deleteUser'
import mockUser from '@testHelpers/mockUser'
import { connectMemoryDb, disconnectMemoryDb, TestDbConnection } from '@testHelpers/memoryDatabase'

describe('Use Case: deleteUser', () => {
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
    it('deletes the user and returns Null', async () => {
      const user = await mockUser()

      await deleteUser(user.id)

      const deletedUser = await findUserById(user.id)
      expect(deletedUser).toBeNull()
    })
  })

  describe('when passing a invalid Id', () => {
    it('throws UserNotFound', async () => {
      await expect(deleteUser('613c27a391f7b2af947b3c33')).rejects.toThrow(UserNotFound)
    })
  })
})

