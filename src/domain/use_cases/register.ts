import UserDuplicated from '@domain/exceptions/UserDuplicated'
import { createUser, findUserByEmail } from '@domain/repositories/UserRepository'
import User from '@domain/entities/User'

async function register(
  username: string,
  email: string,
  password: string
): Promise<User> {
  const userExistent = await isUserExistent(email)
  if (userExistent) {
    throw new UserDuplicated(`User duplicated for email ${email}`)
  }

  return createUser(username, email, password)
}

async function isUserExistent(email: string): Promise<boolean> {
  const user = await findUserByEmail(email)

  return user !== null
}

export default register
