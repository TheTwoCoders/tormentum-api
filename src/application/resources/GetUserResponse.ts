import User from '@domain/entities/User'

class GetUserResponse {
  username: string
  email: string
  constructor(user: User) {
    this.username = user.username.toString()
    this.email = user.email.toString()
  }
}

export default GetUserResponse
