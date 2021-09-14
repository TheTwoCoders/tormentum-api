import ConflictException from '@exceptions/ConflictException'
import UserDuplicated from '@exceptions/UserDuplicated'
import CreateUserRequest from '@resources/CreateUserRequest'
import CreateUserResponse from '@resources/CreateUserResponse'
import register from '@use_cases/register'

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
