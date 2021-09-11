import CreateUserRequest from "../resources/CreateUserRequest"
import CreateUserResponse from "../resources/CreateUserResponse"
import register from '../use_cases/register'

const registerController = async (
  request: CreateUserRequest
): Promise<CreateUserResponse> => {
  const user = await register(
    request.username,
    request.email,
    request.password
  )

  return new CreateUserResponse(user)
}

export { registerController }
