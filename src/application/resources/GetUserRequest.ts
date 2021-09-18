import { IsNotEmpty, IsString } from 'class-validator'

class GetUserRequest {
  @IsString()
  @IsNotEmpty()
  id: string

  constructor(body: Record<string, string>) {
    this.id = body.id
  }
}

export default GetUserRequest
