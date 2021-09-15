import UserNotFound from '@domain/exceptions/UserNotFound'
import { deleteUserById, findUserById } from '@domain/repositories/UserRepository'

const deleteUser = async (id: string): Promise<void> => {
  const user = await findUserById(id)
  if (user == null) {
    throw new UserNotFound(`User not found for Id ${id}`)
  }

  await deleteUserById(id)
}

export default deleteUser
