import Authentication from '@domain/entities/Authentication'

class LoginResponse {
  token: string;
  
  constructor(authentication: Authentication) {
    this.token = authentication.token
  }
}

export default LoginResponse 
