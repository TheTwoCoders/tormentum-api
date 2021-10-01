import jwt, { JwtPayload } from 'jsonwebtoken'

function generateJwtToken(obj: Record<string, unknown>): string {
  return jwt.sign(obj, tokenSecretKey())
}

function verifyToken(token: string): JwtPayload {
  const payload = jwt.verify(token, tokenSecretKey())
  if (typeof (payload) === 'string')
    throw Error('Invalid token payload')

  return payload
}

function tokenSecretKey(): string {
  const secretKey = process.env.TOKEN_SECRET_KEY

  if (secretKey === undefined) {
    throw Error('TOKEN_SECRET_KEY env variable not defined')
  }

  return secretKey
}

export { generateJwtToken, verifyToken }
