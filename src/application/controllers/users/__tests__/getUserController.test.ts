import NotFoundException from '@application/exceptions/NotFoundException'
import GetUserRequest from '@application/resources/GetUserRequest'
import GetUserResponse from '@application/resources/GetUserResponse'
import User from '@domain/entities/User'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { findUserById } from '@domain/repositories/UserRepository'
import { mocked } from 'ts-jest/utils'
import getUserController from '../getUserController'

jest.mock('@domain/repositories/UserRepository')

const mockedGetUser = mocked(findUserById)

describe('Controller: Get User Controller', () => {
  describe('Get User', () => {
    describe('when passing a valid ID', () => {
      it('returns username and email', async () => {
        const request = new GetUserRequest({ id: '123' })
        const user = new User('123', 'john', 'test@gmail.com', 'password')
        const expectedResponse = new GetUserResponse(user)
        mockedGetUser.mockImplementation(async () => user)

        const response = await getUserController(request)

        expect(response).toEqual(expectedResponse)
      })
    })

    describe('when sending an non existent user', () => {
      it('throws NotFoundException', async () => {
        const request = new GetUserRequest({ id: '123' })
        mockedGetUser.mockImplementation(async () => {
          throw new UserNotFound('user not found')
        })

        await expect(getUserController(request))
          .rejects
          .toThrow(NotFoundException)
      })
    })
  })
})
