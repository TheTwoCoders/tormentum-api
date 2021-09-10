import { ObjectId } from "mongoose"

class User {
  id: ObjectId;

  username: string;

  email: string;

  password: string;

  constructor(id: ObjectId, username: string, email: string, password: string) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
  }
}

export default User
