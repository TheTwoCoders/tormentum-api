import NotFoundException from '@application/exceptions/NotFoundException'
import UpdateUserRequest from '@application/resources/UpdateUserRequest'
import UpdateUserResponse from '@application/resources/UpdateUserResponse'
import UserNotFound from '@domain/exceptions/UserNotFound'
import updateUser from '@domain/use_cases/updateUser'

const updateUserController = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  try {
    const user = await updateUser(
      request.id,
      { username: request.username, email: request.email }
    )

    return new UpdateUserResponse(user.id)
  } catch (e) {
    if (e instanceof UserNotFound) {
      throw new NotFoundException(e.message)
    }
    throw e
  }
}

export default updateUserController
