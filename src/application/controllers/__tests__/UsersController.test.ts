import { mocked } from 'ts-jest/utils'
import User from '@domain/entities/User'
import {
  deleteUserController,
  updateUserController
} from '@application/controllers/UsersController'
import UserNotFound from '@domain/exceptions/UserNotFound'
import NotFoundException from '@application/exceptions/NotFoundException'
import deleteUser from '@domain/use_cases/deleteUser'
import DeleteUserResponse from '@application/resources/DeleteUserResponse'
import DeleteUserRequest from '@application/resources/DeleteUserRequest'
import UpdateUserRequest from '@application/resources/UpdateUserRequest'
import UpdateUserResponse from '@application/resources/UpdateUserResponse'
import updateUser from '@domain/use_cases/updateUser'

jest.mock('@domain/use_cases/deleteUser')
jest.mock('@domain/use_cases/updateUser')

const mockedDeleteUser = mocked(deleteUser)
const mockedUpdateUser = mocked(updateUser)

describe('Controllers: Users Controller', () => {
  describe('Delete User Controller', () => {
    describe('when sending a valid request', () => {
      it('calls delete user use case with all params', async () => {
        const request = new DeleteUserRequest({ id: '123' })
        const expectedResponse = new DeleteUserResponse('123')
        mockedDeleteUser.mockImplementation(jest.fn())

        const response = await deleteUserController(request)

        expect(response).toEqual(expectedResponse)
      })
    })

    describe('when sending an non existent user', () => {
      it('throws NotFoundException', async () => {
        const request = new DeleteUserRequest({ id: '123' })
        mockedDeleteUser.mockImplementation(() => {
          throw new UserNotFound('user not found')
        })

        await expect(deleteUserController(request))
          .rejects
          .toThrow(NotFoundException)
      })
    })
  })

  describe('Update user Controller', () => {
    describe('when sending a valid request', () => {
      it('calls update user use case', async () => {
        const request = new UpdateUserRequest({
          id: '123',
          email: 'test@gmail.com'
        })
        const expectedResponse = new UpdateUserResponse('123')
        const user = new User('123', 'john', 'test@gmail.com', 'password')
        mockedUpdateUser.mockImplementation(async () => user)

        const response = await updateUserController(request)

        expect(response).toEqual(expectedResponse)
      })
    })

    describe('when sending an non existent user', () => {
      it('throws NotFoundException', async () => {
        const request = new UpdateUserRequest({
          id: '123',
          email: 'test2@gmail.com'
        })
        mockedUpdateUser.mockImplementation(async () => {
          throw new UserNotFound('user not found')
        })

        await expect(updateUserController(request))
          .rejects
          .toThrow(NotFoundException)
      })
    })
  })
})
