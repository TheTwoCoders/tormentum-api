class ConflictException extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default ConflictException
