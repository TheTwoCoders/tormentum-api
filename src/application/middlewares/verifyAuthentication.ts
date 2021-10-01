import UnauthorizedException from '@application/exceptions/UnauthorizedException'
import { verifyToken } from '@utils/token'
import { NextFunction, Response, Request } from 'express'

function verifyAuthentication(
  req: Request,
  _: Response,
  next: NextFunction
): void {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new UnauthorizedException('You need to pass an auth token on Authorization')
  }

  try {
    const payload = verifyToken(token)
    req.userId = payload.id
    next()
  } catch (e) {
    throw new UnauthorizedException('Invalid auth token provided')
  }
}

export default verifyAuthentication

