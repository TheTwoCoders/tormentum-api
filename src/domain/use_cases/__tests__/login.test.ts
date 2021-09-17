import login from '@domain/use_cases/login'
import UserModel from '@infra/database/models/UserModel'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import UserNotFound from '@domain/exceptions/UserNotFound'
import mockUser from '@testHelpers/mockUser'
import {
  connectMemoryDb,
  disconnectMemoryDb,
  TestDbConnection
} from '@testHelpers/memoryDatabase'

describe('Use Case: Login', () => {
  let connection: TestDbConnection | null = null

  beforeAll(async () => {
    connection = await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb(connection)
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
})
