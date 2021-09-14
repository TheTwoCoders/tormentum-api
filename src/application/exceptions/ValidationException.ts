import ValidationErrorResponse from '@application/resources/ValidationErrorResponse'

class ValidationException extends Error {
  response: ValidationErrorResponse;
  
  constructor(response: ValidationErrorResponse) {
    super(response.message)
    this.response = response
  }
}

export default ValidationException
