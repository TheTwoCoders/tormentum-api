import jwt from "jsonwebtoken"

const generateJwtToken = (obj: Record<string, unknown>): string =>
  jwt.sign(obj, tokenSecretKey())

const tokenSecretKey = (): string => {
  const secretKey = process.env.TOKEN_SECRET_KEY

  if (secretKey === undefined) {
    throw Error('TOKEN_SECRET_KEY env variable not defined')
  }

  return secretKey
}

export { generateJwtToken }