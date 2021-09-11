import { Types } from 'mongoose'
import { mocked } from 'ts-jest/utils'
import User from '../../domain/User'
import CreateUserRequest from '../../resources/CreateUserRequest'
import CreateUserResponse from '../../resources/CreateUserResponse'
import register from '../../use_cases/register'
import { registerController } from '../UsersController'

jest.mock('../../use_cases/register')

const mockedRegister = mocked(register)

describe('Controllers: Users Controller', () => {
  describe('when sending a valid request', () => {
    it('calls register use case with all params', async () => {
      const request = new CreateUserRequest({
        username: 'test',
        email: 'test@test.com',
        password: '123456'
      })
      const user = new User(
        new Types.ObjectId(),
        request.username,
        request.email,
        request.password
      )
      mockedRegister
        .mockImplementation(async () => user)

      await registerController(request)

      expect(register).toHaveBeenCalledWith(
        request.username,
        request.email,
        request.password
      )
    })
  })
})
