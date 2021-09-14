import { Mongoose } from 'mongoose'
import login from '@domain/use_cases/login'
import UserModel from '@infra/database/models/UserModel'
import { connect, disconnect } from '@infra/database/database'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { createUser } from '@domain/repositories/UserRepository'

describe('Use Case: Login', () => {
  let connection: Mongoose | null = null

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
    return createUser('John', email, password)
  }
})
