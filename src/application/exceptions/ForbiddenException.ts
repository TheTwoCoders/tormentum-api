class ForbiddenException extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default ForbiddenException
