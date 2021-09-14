import { Mongoose } from 'mongoose'
import updateUser from '@domain/use_cases/updateUser'
import { connect, disconnect } from '@infra/database/database'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { createUser, deleteAllUsers } from '@domain/repositories/UserRepository'

describe('Use Case: updateUser', () => {
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
    it('updates the user and returns updatedUser', async () => {
      const user = await mockUser()
      const content = { email: 'updatedEmail' }

      const updatedUser = await updateUser(user.id, content)
      await expect(updatedUser?.email).not.toEqual(user.email)
    })
  })

  describe('when passing a invalid Id', () => {
    it('throws UserNotFound', async () => {
      const content = { email: 'updatedEmail' }

      await expect(updateUser('613c27a391f7b2af947b3c33', content)).rejects.toThrow(UserNotFound)
    })
  })

  const mockUser = async () => {
    return createUser('John', 'johnTest@gmail.com', 'password')
  }
})
