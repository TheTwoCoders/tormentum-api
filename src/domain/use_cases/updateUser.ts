import UserNotFound from '@domain/exceptions/UserNotFound'
import { updateUserById } from '@domain/repositories/UserRepository'
import User from '@domain/entities/User'

async function updateUser(
  id: string,
  content: {
    username?: string
    email?: string
    password?: string
  }
): Promise<User> {
  const updatedUser = await updateUserById(id, content)

  if (updatedUser === null)
    throw new UserNotFound(`User not found for id: ${id}`)

  return updatedUser
}

export default updateUser
