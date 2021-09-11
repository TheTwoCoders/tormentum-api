import deleteUser from '../deleteUser'
import UserModel from '../../models/UserModel'
import { Types } from 'mongoose'
import { connect, disconnect } from '../../database'
import UserNotFound from '../../exceptions/UserNotFound'
import deleteAccount from '../deleteUser'
import { createUser, findUserById } from '../../repositories/UserRepository'

describe('Use Case: deleteAccount', () => {
  let connection = null

  beforeAll(async () => {
    connection = await connect(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await disconnect(connection)
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
  })

  describe('when passing a valid Id', () => {
    it('deletes the user and returns Null', async () => {
      const user = await mockUser()

      await deleteAccount(user.id)

      const deletedUser = await findUserById(user.id)
      expect(deletedUser).toBeNull()
    })
  })

  describe('when passing a invalid Id', () => {
    it('throws UserNotFound', async () => {
      await expect(deleteUser(new Types.ObjectId())).rejects.toThrow(UserNotFound)
    })
  })

  const mockUser = async () => {
    return createUser('John', 'johnTest@gmail.com', 'password')
  }
})

