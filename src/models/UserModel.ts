import { Schema, model, ObjectId } from 'mongoose'

interface User {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
}

const schema = new Schema<User>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

const UserModel = model<User>('User', schema)

export { User }

export default UserModel
