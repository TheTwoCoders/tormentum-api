import UserModel from '@infra/database/models/UserModel'
import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  findUserByEmail,
  findUserById,
  updateUserById
} from '@domain/repositories/UserRepository'
import {
  connectMemoryDb,
  disconnectMemoryDb,
  TestDbConnection
} from '@testHelpers/memoryDatabase'

describe('Repositories: UserRepository', () => {
  let connection: TestDbConnection | null = null

  beforeAll(async () => {
    connection = await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb(connection)
  })

  beforeEach(async () => {
    await deleteAllUsers()
  })

  describe('when creating an user', () => {
    it('creates an user on database', async () => {
      const user = await createUser('TestUsername', 'test@email.com', 'testpassword')

      const foundUser = await UserModel.findById(user.id)

      expect(foundUser).not.toBeNull()
    })
  })

  describe('when deleting all users', () => {
    it('no user can be found on database', async () => {
      const user1 = await createUser('test1', 'test1@test.com', 'test1')
      const user2 = await createUser('test2', 'test2@test.com', 'test2')

      await deleteAllUsers()

      const foundUser1 = await UserModel.findById(user1.id)
      const foundUser2 = await UserModel.findById(user2.id)
      expect(foundUser1).toBeNull()
      expect(foundUser2).toBeNull()
    })
  })

  describe('when finding user by email', () => {
    describe('and the user exist', () => {
      it('returns the user found', async () => {
        const user = await createUser('test', 'finding@test.com', 'test1')

        const foundUser = await findUserByEmail(user.email)

        expect(foundUser?.id).toEqual(user.id)
      })
    })

    describe('and the user does not exist', () => {
      it('returns null', async () => {
        const foundUser = await findUserByEmail('not-existent@email.com')

        expect(foundUser).toBeNull()
      })
    })
  })

  describe('when finding user by Id', () => {
    describe('and the user exist', () => {
      it('returns the user found', async () => {
        const user = await createUser('test', 'findingById@test.com', 'test1')

        const foundUser = await findUserById(user.id)

        expect(foundUser?.id).toEqual(user.id)
      })
    })

    describe('and the user does not exist', () => {
      it('returns null', async () => {
        const foundUser = await findUserById('613c1a013e0b4ef57aaaa3c9')

        expect(foundUser).toBeNull()
      })
    })
  })

  describe('when deleting one user by Id', () => {
    it('the user cannot be found on database', async () => {
      const user = await createUser('test1', 'test1@test.com', 'test1')

      await deleteUserById(user.id)

      const foundUser = await UserModel.findById(user.id)
      expect(foundUser).toBeNull()
    })
  })

  describe('when updating one user by Id', () => {
    it('modifies user data', async () => {
      const user = await createUser('test', 'test2@test.com', 'test1')
      const content = { email: 'updatedEmail' }

      await updateUserById(user.id, content)

      const foundUser = await findUserByEmail('updatedEmail')
      expect(foundUser).not.toBeNull()
    })
  })
})
