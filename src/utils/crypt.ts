import CryptoJS from 'crypto-js'

function encryptPassword(password: string): string {
  return CryptoJS.AES
    .encrypt(password, passwordSecretKey())
    .toString()
}

function verifyPassword(
  password: string,
  encryptedPassword: string
): boolean {
  const decryptedPassword = CryptoJS.AES
    .decrypt(encryptedPassword, passwordSecretKey())
    .toString(CryptoJS.enc.Utf8)

  return decryptedPassword === password
}

function passwordSecretKey(): string {
  const secretKey = process.env.PASSWORD_SECRET_KEY

  if (secretKey === undefined) {
    throw Error('PASSWORD_SECRET_KEY env variable not defined')
  }

  return secretKey
}

export { encryptPassword, verifyPassword }
