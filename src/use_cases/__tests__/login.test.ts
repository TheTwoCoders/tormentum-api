import login from '../login'
import UserModel from '../../models/UserModel'
import { encryptPassword } from '../../utils/crypt'
import { connect, disconnect } from '../../database'

describe('Use Case: Login', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await disconnect()
  })

  beforeEach(async () => {
    await UserModel.deleteMany({})
  })

  describe('when passing a valid email and password', () => {
    it('returns the logged in user', async () => {
      const email = 'john@test.com'
      const password = '123456'
      const user = await createUser(email, password)

      const loggedInUser = await login(email, password)

      expect(loggedInUser._id).toEqual(user._id)
    })
  })

  const createUser = async (email: string, password: string) => {
    const user = new UserModel({
      username: 'John',
      email,
      password: encryptPassword(password)
    })

    return user.save()
  }
})
