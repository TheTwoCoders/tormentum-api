import UserNotFound from '@domain/exceptions/UserNotFound'
import NotFoundException from '@application/exceptions/NotFoundException'
import DeleteUserRequest from '@application/resources/DeleteUserRequest'
import DeleteUserResponse from '@application/resources/DeleteUserResponse'
import deleteUser from '@domain/use_cases/deleteUser'
import UpdateUserRequest from '@application/resources/UpdateUserRequest'
import UpdateUserResponse from '@application/resources/UpdateUserResponse'
import updateUser from '@domain/use_cases/updateUser'

const deleteUserController = async (
  request: DeleteUserRequest
): Promise<DeleteUserResponse> => {
  try {
    const userId = request.id

    await deleteUser(userId)

    return new DeleteUserResponse(userId)
  } catch (e) {
    if (e instanceof UserNotFound) {
      throw new NotFoundException(e.message)
    }

    throw e
  }
}

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

export { deleteUserController, updateUserController }
