import { ValidationError } from 'class-validator'
import ErrorResponse, { ErrorDetail } from './ErrorResponse'

class ValidationErrorResponse extends ErrorResponse {
  constructor(errors: ValidationError[]) {
    const message = 'Validation error'
    const details = errors.map(error => new ErrorDetail(
      error.property,
      JSON.stringify(error.constraints)
    ))

    super(message, details)
  }

}

export default ValidationErrorResponse
