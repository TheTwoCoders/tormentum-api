import ValidationErrorResponse from "../resources/ValidationErrorResponse"

class ValidationException extends Error {
  response: ValidationErrorResponse;
  
  constructor(response: ValidationErrorResponse) {
    super(response.message)
    this.response = response
  }
}

export default ValidationException
