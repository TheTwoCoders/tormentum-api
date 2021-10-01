import { validate } from 'class-validator'
import ValidationException from '@application/exceptions/ValidationException'
import ValidationErrorResponse from '@application/resources/ValidationErrorResponse'

async function validateRequest(requestObj: object): Promise<void> {
  const errors = await validate(requestObj)

  if (errors.length > 0) {
    const response = new ValidationErrorResponse(errors)
    throw new ValidationException(response)
  }
}

export { validateRequest }
