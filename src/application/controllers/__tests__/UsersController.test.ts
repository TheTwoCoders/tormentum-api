import { mocked } from 'ts-jest/utils'
import User from '@domain/entities/User'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import register from '@domain/use_cases/register'
import { loginController, registerController } from '@application/controllers/UsersController'
import LoginRequest from '@application/resources/LoginRequest'
import Authentication from '@domain/entities/Authentication'
import login from '@domain/use_cases/login'
import UserNotFound from '@domain/exceptions/UserNotFound'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import NotFoundException from '@application/exceptions/NotFoundException'
import BadRequestException from '@application/exceptions/BadRequestException'

jest.mock('@domain/use_cases/register')
jest.mock('@domain/use_cases/login')

const mockedRegister = mocked(register)
const mockedLogin = mocked(login)

describe('Controllers: Users Controller', () => {
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
  })

  describe('Login Controller', () => {
    describe('when sending a valid request', () => {
      it('calls login use case with all params', async () => {
        const request = new LoginRequest({
          email:'test@test.com',
          password:'123456'
        })
        const user = new User(
          '613c1a2a7c3c65de8fa77384',
          'jhonDoe',
          request.email,
          request.password
        )
        const authentication = new Authentication(user)
        mockedLogin
          .mockImplementation(async()=>authentication)

        await loginController(request)

        expect(login).toHaveBeenCalledWith(
          request.email,
          request.password
        )
      })
    })

    describe('when sending a non existent user', () => {
      it('throws NotFoundException', async () => {
        const request = new LoginRequest({
          email:'test@test.com',
          password:'123456'
        })
        mockedLogin
          .mockImplementation(async () => {
            throw new UserNotFound('user not found')
          })

        await expect(loginController(request))
          .rejects
          .toThrow(NotFoundException)
      })
    })

    describe('when sending an incorrect password', () => {
      it('throws ValidationException', async () => {
        const request = new LoginRequest({
          email:'test@test.com',
          password:'123456'
        })
        mockedLogin
          .mockImplementation(async () => {
            throw new UserPasswordIncorrect('user incorrect password')
          })

        await expect(loginController(request))
          .rejects
          .toThrow(BadRequestException)
      })
    })
  })
})
