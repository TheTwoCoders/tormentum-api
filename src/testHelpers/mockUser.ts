import User from '@domain/entities/User'
import { createUser } from '@domain/repositories/UserRepository'

async function mockUser(
  email = 'standardTestEmail@email.com',
  password = 'standardPassword'
): Promise<User> {
  return createUser('John', email, password)
}

export default mockUser
