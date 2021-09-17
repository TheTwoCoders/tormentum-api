import User from "@domain/entities/User";

class UpdateUserResponse {
  id: string;

  constructor(id: string) {
    this.id = id
  }
}

export default UpdateUserResponse