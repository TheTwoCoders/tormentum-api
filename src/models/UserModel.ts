import { Schema, model, ObjectId } from 'mongoose'
import User from '../domain/User'

interface UserDbInterface {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
}

const schema = new Schema<UserDbInterface>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const UserModel = model<UserDbInterface>('User', schema)

const userModelToDomain = (userDb: UserDbInterface): User => {
  return new User(userDb._id.toString(), userDb.username, userDb.email, userDb.password)
}

export { userModelToDomain }

export default UserModel
