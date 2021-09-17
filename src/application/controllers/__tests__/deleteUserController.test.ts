import NotFoundException from '@application/exceptions/NotFoundException'
import DeleteUserRequest from '@application/resources/DeleteUserRequest'
import DeleteUserResponse from '@application/resources/DeleteUserResponse'
import UserNotFound from '@domain/exceptions/UserNotFound'
import deleteUser from '@domain/use_cases/deleteUser'
import { mocked } from 'ts-jest/utils'
import { deleteUserController } from '../deleteUserController'

jest.mock('@domain/use_cases/deleteUser')

const mockedDeleteUser = mocked(deleteUser)

describe('Name of the group', () => {
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
})
