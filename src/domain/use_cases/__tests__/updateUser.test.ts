import updateUser from '@domain/use_cases/updateUser'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { deleteAllUsers } from '@domain/repositories/UserRepository'
import mockUser from '@testHelpers/mockUser'
import {
  connectMemoryDb,
  disconnectMemoryDb,
  TestDbConnection
} from '@testHelpers/memoryDatabase'

describe('Use Case: updateUser', () => {
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
    it('updates the user and returns updatedUser', async () => {
      const user = await mockUser()
      const content = { email: 'updatedEmail' }

      const updatedUser = await updateUser(user.id, content)
      expect(updatedUser?.email).not.toEqual(user.email)
    })
  })

  describe('when passing a invalid Id', () => {
    it('throws UserNotFound', async () => {
      const content = { email: 'updatedEmail' }

      await expect(updateUser('613c27a391f7b2af947b3c33', content)).rejects.toThrow(UserNotFound)
    })
  })
})

