import CreateUserRequest from '@application/resources/CreateUserRequest'
import User from '@domain/entities/User'
import register from '@domain/use_cases/register'
import { mocked } from 'ts-jest/utils'
import ConflictException from '@application/exceptions/ConflictException'
import { registerController } from '@application/controllers/registerController'

jest.mock('@domain/use_cases/register')
const mockedRegister = mocked(register)

describe('Controller: Register Controller', () => {
  describe('Register Controller', () => {
    describe('when sending a valid request', () => {
      it('calls register use case with all params', async () => {
        const request = new CreateUserRequest({
          username: 'test',
          email: 'test@test.com',
          password: '123456'
        })
        const user = new User(
          '613c1a2a7c3c65de8fa77384',
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

    describe('when sending an already existent user', () => {
      it('throws ConflictException', async () => {
        const request = new CreateUserRequest({
          name: 'john',
          email: 'test@test.com',
          password: '123456'
        })
        mockedRegister
          .mockImplementation(async () => {
            throw new ConflictException('user already exists')
          })

        await expect(registerController(request))
          .rejects
          .toThrow(ConflictException)
      })
    })
  })
})

