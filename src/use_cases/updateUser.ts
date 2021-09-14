import UserNotFound from '@exceptions/UserNotFound'
import { updateUserById } from '@repositories/UserRepository'
import User from '@domain/User'

const updateUser = async (
  id: string,
  content: {
    username?: string,
    email?: string,
    password?: string
  }
): Promise<User | null> => {
  const updatedUser = await updateUserById(id, content)

  if (updatedUser == null) {
    throw new UserNotFound(`User not found for Id ${id}`)
  }

  return updatedUser
}

export default updateUser
