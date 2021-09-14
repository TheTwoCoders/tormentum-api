class UserNotFound extends Error {
  constructor(message: string) {
    super(message)
  }
}

export default UserNotFound
