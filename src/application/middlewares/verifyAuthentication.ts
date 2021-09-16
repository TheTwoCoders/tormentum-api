import UnauthorizedException from '@application/exceptions/UnauthorizedException'
import { verifyToken } from '@utils/token'
import { NextFunction, Response, Request } from 'express'

const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new UnauthorizedException('You need to pass an auth token on Authorization')
  }

  try {
    verifyToken(token)
    next()
  } catch (e) {
    throw new UnauthorizedException('Invalid auth token provided')
  }
}

export default verifyAuthentication
