import updateUser from '../updateUser'
import { connect, disconnect } from '../../database'
import UserNotFound from '../../exceptions/UserNotFound'
import { createUser, deleteAllUsers } from '../../repositories/UserRepository'

describe('Use Case: updateUser', () => {
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
    it('updates the user and returns updatedUser', async () => {
      const user = await mockUser()
      const content = { email: 'updatedEmail' }

      const updatedUser = await updateUser(user.id, content)
      console.log(updatedUser)
      await expect(updatedUser.email).not.toEqual(user.email)
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

