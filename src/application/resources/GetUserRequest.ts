import { IsNotEmpty, IsString } from 'class-validator'

class GetUserRequest {
  @IsString()
  @IsNotEmpty()
  id: string

  constructor(params: Record<string, string>) {
    this.id = params.id
  }
}

export default GetUserRequest
