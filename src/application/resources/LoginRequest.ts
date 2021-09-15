import { IsEmail, MinLength } from 'class-validator'

class LoginRequest {
 
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string

  constructor(body: Record<string, string>) {
    this.password = body.password
    this.email = body.email
  }
}

export default LoginRequest
