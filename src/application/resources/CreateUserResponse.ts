import User from '@domain/entities/User'

class CreateUserResponse {
  id: string;

  constructor(user: User) {
    this.id = user.id.toString()
  }
}

export default CreateUserResponse
