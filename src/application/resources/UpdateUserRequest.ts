import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

class UpdateUserRequest {

  @IsString()
  @IsNotEmpty()
  id: string;

  @MinLength(3)
  @MaxLength(30)
  @IsOptional()
  username: string;

  @IsEmail()
  @IsOptional()
  email: string

  constructor(body: Record<string, string>) {
    this.id = body.id
    this.username = body.username
    this.email = body.email
  }
}

export default UpdateUserRequest