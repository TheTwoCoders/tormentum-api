import express from 'express'
import ConflictException from '@application/exceptions/ConflictException'
import ValidationException from '@application/exceptions/ValidationException'
import ErrorResponse from '@application/resources/ErrorResponse'
import ValidationErrorResponse from '@application/resources/ValidationErrorResponse'
import BadRequestException from '@application/exceptions/BadRequestException'
import NotFoundException from '@application/exceptions/NotFoundException'
import UnauthorizedException from '@application/exceptions/UnauthorizedException'

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
  } else if (e instanceof BadRequestException) {
    return respondError(res, 400, new ErrorResponse(e.message))
  } else if (e instanceof NotFoundException) {
    return respondError(res, 404, new ErrorResponse(e.message))
  } else if (e instanceof UnauthorizedException) {
    return respondError(res, 401, new ErrorResponse(e.message))
  }

  return respondUnknownError(res, e.message)
}

export {
  handleError
}
