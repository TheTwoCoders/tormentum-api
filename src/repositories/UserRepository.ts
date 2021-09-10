import { ObjectId } from "mongoose"
import User from "../domain/User"
import UserModel, { userModelToDomain } from "../models/UserModel"
import { encryptPassword } from '../utils/crypt'

const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const user = new UserModel({
    username,
    email,
    password: encryptPassword(password)
  })
  const savedUser = await user.save()

  return userModelToDomain(savedUser)
}

const deleteAllUsers = async (): Promise<void> => {
  await UserModel.deleteMany({})
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email })

  if (user === null) return null

  return userModelToDomain(user)
}

const findUserById = async (id: ObjectId): Promise<User | null> => {
  const user = await UserModel.findById(id)

  if (user === null) return null

  return userModelToDomain(user)
}

const deleteUserById = async (id: ObjectId): Promise<void> => {
  await UserModel.deleteOne({ _id: id })
}

export { createUser, deleteAllUsers, findUserByEmail, findUserById, deleteUserById }
