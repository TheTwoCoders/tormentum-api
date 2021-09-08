import CryptoJS from 'crypto-js'

const encryptPassword = (password: string): string => 
  CryptoJS.AES
    .encrypt(password, passwordSecretKey())
    .toString()

const verifyPassword = (
  password: string,
  encryptedPassword: string
): boolean => {
  const decryptedPassword = CryptoJS.AES
    .decrypt(encryptedPassword, passwordSecretKey())
    .toString(CryptoJS.enc.Utf8)
  
  return decryptedPassword === password
}

const passwordSecretKey = (): string => {
  const secretKey = process.env.PASSWORD_SECRET_KEY

  if (secretKey === undefined) {
    throw Error('PASSWORD_SECRET_KEY env variable not defined')
  }

  return secretKey
}

export { encryptPassword, verifyPassword }
