import User from '@domain/entities/User'
import UserNotFound from '@domain/exceptions/UserNotFound'
import { findUserById } from '@domain/repositories/UserRepository'

const getUser = async (id: string): Promise<User> => {
  const foundUser = await findUserById(id)

  if (foundUser === null) throw new UserNotFound(`User not found for id ${id}`)

  return foundUser
}

export default getUser
