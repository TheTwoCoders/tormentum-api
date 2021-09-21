import NotFoundException from '@application/exceptions/NotFoundException'
import GetUserRequest from '@application/resources/GetUserRequest'
import GetUserResponse from '@application/resources/GetUserResponse'
import UserNotFound from '@domain/exceptions/UserNotFound'
import getUser from '@domain/use_cases/getUser'

const getUserController = async (
  request: GetUserRequest
): Promise<GetUserResponse> => {
  try {
    const user = await getUser(request.id)

    return new GetUserResponse(user)
  } catch (e) {
    if (e instanceof UserNotFound) {
      throw new NotFoundException(e.message)
    }
    throw e
  }
}

export default getUserController
