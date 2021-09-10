import { Types } from 'mongoose'
import { connect, disconnect } from '../../database'
import UserModel from '../../models/UserModel'
import { createUser, deleteAllUsers, deleteUserById, findUserByEmail, findUserById } from '../UserRepository'

describe('Repositories: UserRepository', () => {
  let connection = null

  beforeAll(async () => {
    connection = await connect(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await disconnect(connection)
  })

  beforeEach(() => {
    UserModel.deleteMany({})
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

        expect(foundUser.id).toEqual(user.id)
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

        expect(foundUser.id).toEqual(user.id)
      })
    })

    describe('and the user does not exist', () => {
      it('returns null', async () => {
        const foundUser = await findUserById(new Types.ObjectId())

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
})
