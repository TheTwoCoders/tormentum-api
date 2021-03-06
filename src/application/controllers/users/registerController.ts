import ConflictException from '@application/exceptions/ConflictException'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import CreateUserResponse from '@application/resources/CreateUserResponse'
import UserDuplicated from '@domain/exceptions/UserDuplicated'
import register from '@domain/use_cases/register'

async function registerController(
  request: CreateUserRequest
): Promise<CreateUserResponse> {
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

export default registerController
