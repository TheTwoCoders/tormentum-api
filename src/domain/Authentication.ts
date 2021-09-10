import User from "./User"
import { generateJwtToken } from "../utils/token"

class Authentication {
  user: User

  constructor(user: User) {
    this.user = user
  }

  get token(): string {
    return generateJwtToken({ id: this.user.id })
  }
}

export default Authentication
