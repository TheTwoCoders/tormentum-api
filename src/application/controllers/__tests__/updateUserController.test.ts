import NotFoundException from '@application/exceptions/NotFoundException'
import UpdateUserRequest from '@application/resources/UpdateUserRequest'
import UpdateUserResponse from '@application/resources/UpdateUserResponse'
import User from '@domain/entities/User'
import UserNotFound from '@domain/exceptions/UserNotFound'
import updateUser from '@domain/use_cases/updateUser'
import { mocked } from 'ts-jest/utils'
import { updateUserController } from '../updateUserController'

jest.mock('@domain/use_cases/updateUser')

const mockedUpdateUser = mocked(updateUser)

describe('Name of the group', () => {
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
