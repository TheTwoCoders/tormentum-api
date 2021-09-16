import { IsNotEmpty, IsString } from 'class-validator'

class DeleteUserRequest {
  @IsString()
  @IsNotEmpty()
  id: string

  constructor(params: Record<string, string>) {
    this.id = params.id
  }
}

export default DeleteUserRequest
