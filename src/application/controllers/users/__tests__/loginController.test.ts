import BadRequestException from '@application/exceptions/BadRequestException'
import NotFoundException from '@application/exceptions/NotFoundException'
import LoginRequest from '@application/resources/LoginRequest'
import Authentication from '@domain/entities/Authentication'
import User from '@domain/entities/User'
import UserNotFound from '@domain/exceptions/UserNotFound'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import login from '@domain/use_cases/login'
import { mocked } from 'ts-jest/utils'
import loginController from '../loginController'

jest.mock('@domain/use_cases/login')

const mockedLogin = mocked(login)

describe('Controller: Login Controller', () => {
  describe('Login Controller', () => {
    describe('when sending a valid request', () => {
      it('calls login use case with all params', async () => {
        const request = new LoginRequest({
          email: 'test@test.com',
          password: '123456'
        })
        const user = new User(
          '613c1a2a7c3c65de8fa77384',
          'jhonDoe',
          request.email,
          request.password
        )
        const authentication = new Authentication(user)
        mockedLogin
          .mockImplementation(async () => authentication)

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
          email: 'test@test.com',
          password: '123456'
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
          email: 'test@test.com',
          password: '123456'
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
