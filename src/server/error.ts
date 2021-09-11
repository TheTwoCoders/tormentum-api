import express from 'express'
import ValidationException from '../exceptions/ValidationException'
import ErrorResponse from "../resources/ErrorResponse"
import ValidationErrorResponse from '../resources/ValidationErrorResponse'

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
  }

  return respondUnknownError(res, e.message)
}

export {
  handleError
}
