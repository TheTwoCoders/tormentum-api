import ConflictException from '@application/exceptions/ConflictException'
import UserDuplicated from '@domain/exceptions/UserDuplicated'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import CreateUserResponse from '@application/resources/CreateUserResponse'
import register from '@domain/use_cases/register'

const registerController = async (
  request: CreateUserRequest
): Promise<CreateUserResponse> => {
  try {
    const user = await register(
      request.username,
      request.email,
      request.password
    )

    return new CreateUserResponse(user)
  } catch (e) {
    if (e instanceof UserDuplicated) {
      throw new ConflictException(e.message)
    }
    throw e
  }
}

export { registerController }
