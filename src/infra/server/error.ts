import express from 'express'
import ConflictException from '@application/exceptions/ConflictException'
import ValidationException from '@application/exceptions/ValidationException'
import ErrorResponse from '@application/resources/ErrorResponse'
import ValidationErrorResponse from '@application/resources/ValidationErrorResponse'

const respondError = (
  res: express.Response,
  status: number,
  error: ErrorResponse
): void => {
  res.status(status),
  res.json(error)
}

const respondValidationError = (
  res: express.Response,
  error: ValidationErrorResponse
): void => {
  respondError(res, 400, error)
}

const respondUnknownError = (
  res: express.Response,
  message: string
): void => {
  respondError(res, 500, new ErrorResponse(message))
}

const handleError = (res: express.Response, e: Error): void => {
  if (e instanceof ValidationException) {
    return respondValidationError(res, e.response)
  } else if (e instanceof ConflictException) {
    return respondError(res, 409, new ErrorResponse(e.message))
  }

  return respondUnknownError(res, e.message)
}

export {
  handleError
}
