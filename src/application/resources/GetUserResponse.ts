import User from '@domain/entities/User'

class GetUserResponse {
  username: string
  email: string
  constructor(user: User) {
    this.username = user.username
    this.email = user.email
  }
}

export default GetUserResponse
