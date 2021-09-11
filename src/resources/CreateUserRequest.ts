import { IsEmail, MaxLength, MinLength } from "class-validator"

class CreateUserRequest {
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @MinLength(6)
  password: string;

  @IsEmail()
  email: string

  constructor(body: Record<string, string>) {
    this.username = body.username
    this.password = body.password
    this.email = body.email
  }
}

export default CreateUserRequest
