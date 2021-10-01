import BadRequestException from '@application/exceptions/BadRequestException'
import NotFoundException from '@application/exceptions/NotFoundException'
import LoginRequest from '@application/resources/LoginRequest'
import LoginResponse from '@application/resources/LoginResponse'
import UserNotFound from '@domain/exceptions/UserNotFound'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import login from '@domain/use_cases/login'

async function loginController(
  request: LoginRequest
): Promise<LoginResponse> {
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

export default loginController
