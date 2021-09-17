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
import DeleteUserRequest from '@application/resources/DeleteUserRequest'
import DeleteUserResponse from '@application/resources/DeleteUserResponse'
import deleteUser from '@domain/use_cases/deleteUser'
import UpdateUserRequest from '@application/resources/UpdateUserRequest'
import UpdateUserResponse from '@application/resources/UpdateUserResponse'
import updateUser from '@domain/use_cases/updateUser'

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

export { registerController, loginController, deleteUserController, updateUserController }
