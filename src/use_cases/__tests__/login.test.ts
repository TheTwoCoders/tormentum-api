import login from '../login'
import User from '../../models/User'
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
    await User.deleteMany({})
  })

  describe('when passing a valid email and password', () => {
    it('returns the logged in user', async () => {
      const email = 'john@test.com'
      const password = '123456'
      const user = await createUser({ email, password })

      const loggedInUser = await login(email, password)

      expect(loggedInUser._id).toEqual(user._id)
    })
  })

  const createUser = async ({ email, password }) => {
    const user = new User({
      username: 'John',
      email,
      password: encryptPassword(password)
    })

    return user.save()
  }
})
