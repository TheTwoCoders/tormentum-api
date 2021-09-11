import User from "../domain/User"

class CreateUserResponse {
  id: string;

  constructor(user: User) {
    this.id = user.id.toString()
  }
}

export default CreateUserResponse
