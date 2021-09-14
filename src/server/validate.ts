import { validate } from 'class-validator'
import ValidationException from '@exceptions/ValidationException'
import ValidationErrorResponse from '@resources/ValidationErrorResponse'

const validateRequest = async (
  requestObj: object
): Promise<void> => {
  const errors = await validate(requestObj)

  if (errors.length > 0) {
    const response = new ValidationErrorResponse(errors)
    throw new ValidationException(response)
  }
}

export { validateRequest }
