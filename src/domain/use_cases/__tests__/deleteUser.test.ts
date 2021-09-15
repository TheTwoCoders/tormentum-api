import { Mongoose } from 'mongoose'
import { connect, disconnect } from '@infra/database/database'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { deleteAllUsers, findUserById } from '@domain/repositories/UserRepository'
import deleteUser from '@domain/use_cases/deleteUser'
import mockUser from '@testHelpers/mockUser'

describe('Use Case: deleteAccount', () => {
  let connection: Mongoose | null = null

  beforeAll(async () => {
    connection = await connect(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await disconnect(connection)
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

