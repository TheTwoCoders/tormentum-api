import NotFoundException from '@application/exceptions/NotFoundException'
import DeleteUserRequest from '@application/resources/DeleteUserRequest'
import DeleteUserResponse from '@application/resources/DeleteUserResponse'
import UserNotFound from '@domain/exceptions/UserNotFound'
import deleteUser from '@domain/use_cases/deleteUser'

async function deleteUserController(
  request: DeleteUserRequest
): Promise<DeleteUserResponse> {
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

export default deleteUserController
