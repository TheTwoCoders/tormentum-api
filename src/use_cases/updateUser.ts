import { ObjectId } from "mongoose"
import UserNotFound from "../exceptions/UserNotFound"
import { findUserById, updateUserById } from "../repositories/UserRepository"

const updateUser = async (id: ObjectId, content: { username?: string, email?: string, password?: string }): Promise<User> => {
  const user = await findUserById(id)
  if (user == null) {
    throw new UserNotFound(`User not found for Id ${id}`)
  }
  await updateUserById(id, content)
  const updatedUser = await findUserById(id)
  return updatedUser
}

export default updateUser
