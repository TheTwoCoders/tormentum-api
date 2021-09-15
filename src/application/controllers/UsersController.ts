import ConflictException from '@application/exceptions/ConflictException'
import UserDuplicated from '@domain/exceptions/UserDuplicated'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import CreateUserResponse from '@application/resources/CreateUserResponse'
import register from '@domain/use_cases/register'
import LoginResponse from '@application/resources/LoginResponse'
import LoginRequest from '@application/resources/LoginRequest'
import login from '@domain/use_cases/login'
import UserNotFound from '@domain/exceptions/UserNotFound'
import NotFoundException from '@application/exceptions/NotFoundException'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import BadRequestException from '@application/exceptions/BadRequestException'

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

const loginController = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  try {
    const authentication = await login(
      request.email,
      request.password
    )
    return new LoginResponse(authentication)
  } catch (e) {
    if (e instanceof UserNotFound) {
      throw new NotFoundException(e.message)
    } else if (e instanceof UserPasswordIncorrect) {
      throw new BadRequestException(e.message)
    }
    throw e 
  }
}

export { registerController, loginController }
