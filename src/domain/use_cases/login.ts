import Authentication from '@domain/entities/Authentication'
import User from '@domain/entities/User'
import UserNotFound from '@domain/exceptions/UserNotFound'
import UserPasswordIncorrect from '@domain/exceptions/UserPasswordIncorrect'
import { findUserByEmail } from '@domain/repositories/UserRepository'
import { verifyPassword } from '@utils/crypt'

const login = async (
  email: string,
  password: string
): Promise<Authentication> => {
  const user = await findUser(email)
  const isPasswordCorrect = verifyPassword(password, user.password)

  if (isPasswordCorrect) return new Authentication(user)

  throw new UserPasswordIncorrect(`Password incorrect for email ${email}`)
}

const findUser = async (email: string): Promise<User> => {
  const user = await findUserByEmail(email)

  if (user === null) {
    throw new UserNotFound(`User not found for email ${email}`)
  }

  return user
}

export default login
