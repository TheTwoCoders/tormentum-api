import UserNotFound from '../exceptions/UserNotFound'
import UserPasswordIncorrect from '../exceptions/UserPasswordIncorrect'
import UserModel, { User } from '../models/UserModel'
import { verifyPassword } from '../utils/crypt'

const login = async (
  email: string,
  password: string
): Promise<User> => {
  const user = await findUser(email)
  const isPasswordCorrect = verifyPassword(password, user.password)

  if (isPasswordCorrect) return user

  throw new UserPasswordIncorrect(`Password incorrect for email ${email}`)
}

const findUser = async (email: string): Promise<User> => {
  const user = await UserModel.findOne({ email })

  if (user == null) {
    throw new UserNotFound(`User not found for email ${email}`)
  }

  return user
}

export default login
