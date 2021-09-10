import login from '../login'
import UserModel from '../../models/UserModel'
import { encryptPassword } from '../../utils/crypt'
import { connect, disconnect } from '../../database'
import UserPasswordIncorrect from '../../exceptions/UserPasswordIncorrect'
import UserNotFound from '../../exceptions/UserNotFound'
import { createUser } from '../../repositories/UserRepository'

describe('Use Case: Login', () => {
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

  describe('when passing a valid email and password', () => {
    it('returns the logged in user', async () => {
      const email = 'john@test.com'
      const password = '123456'
      const user = await mockUser(email, password)

      const authentication = await login(email, password)

      expect(authentication.user.id).toEqual(user.id)
      expect(authentication.token).not.toBeNull()
    })
  })

  describe('when passing an invalid password', () => {
    it('throws UserPasswordIncorrect', async () => {
      const email = 'john@test2.com'
      const password = '123456'
      const wrongPassword = 'abcd'
      await mockUser(email, password)

      await expect(login(email, wrongPassword))
        .rejects
        .toThrow(UserPasswordIncorrect)
    })
  })

  describe('when passing an invalid email', () => {
    it('throws UserNotFound', async () => {
      const nonExistentEmail = 'john@notfound.com'
      const password = '123456'

      await expect(login(nonExistentEmail, password))
        .rejects
        .toThrow(UserNotFound)
    })
  })

  const mockUser = async (email: string, password: string) => {
    return createUser('John', email, encryptPassword(password))
  }
})
