import deleteUser from '../deleteUser'
import { connect, disconnect } from '../../database'
import UserNotFound from '../../exceptions/UserNotFound'
import { createUser, deleteAllUsers, findUserById } from '../../repositories/UserRepository'

describe('Use Case: deleteAccount', () => {
  let connection = null

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

  const mockUser = async () => {
    return createUser('John', 'johnTest@gmail.com', 'password')
  }
})

