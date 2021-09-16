class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default UnauthorizedException
