import User from '@domain/entities/User'
import UserModel, { userModelToDomain } from '@infra/database/models/UserModel'
import { encryptPassword } from '@utils/crypt'

async function createUser(username: string,
  email: string,
  password: string): Promise<User> {
  const user = new UserModel({
    username,
    email,
    password: encryptPassword(password)
  })
  const savedUser = await user.save()

  return userModelToDomain(savedUser)
}

async function deleteAllUsers(): Promise<void> {
  await UserModel.deleteMany({})
}

async function findUserByEmail(email: string): Promise<User | null> {
  const user = await UserModel.findOne({ email })

  if (user === null) return null

  return userModelToDomain(user)
}

async function findUserById(id: string): Promise<User | null> {
  const user = await UserModel.findById(id)

  if (user === null) return null

  return userModelToDomain(user)
}

async function deleteUserById(id: string): Promise<void> {
  await UserModel.findByIdAndDelete(id)
}

async function updateUserById(
  id: string,
  content: {
    username?: string
    email?: string
    password?: string
  }
): Promise<User | null> {
  const updatedUser = await UserModel.findByIdAndUpdate(id, content)

  if (updatedUser == null) return null

  return findUserById(id)
}

export { createUser, deleteAllUsers, findUserByEmail, findUserById, deleteUserById, updateUserById }

