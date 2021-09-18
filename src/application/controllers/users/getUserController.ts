import NotFoundException from '@application/exceptions/NotFoundException'
import GetUserRequest from '@application/resources/GetUserRequest'
import GetUserResponse from '@application/resources/GetUserResponse'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { findUserById } from '@domain/repositories/UserRepository'

const getUserController = async (
  request: GetUserRequest
): Promise<GetUserResponse> => {
  try {
    const user = await findUserById(request.id)
    if (user === null) throw new NotFoundException('User Not found')

    return new GetUserResponse(user)
  } catch (e) {
    if (e instanceof UserNotFound) {
      throw new NotFoundException(e.message)
    }
    throw e
  }
}

export default getUserController
