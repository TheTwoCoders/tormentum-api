import UserDuplicated from '../exceptions/UserDuplicated'
import { createUser, findUserByEmail } from '../repositories/UserRepository'
import User from '../domain/User'

const register = async (username: string, email: string, password: string): Promise<User> => {
    const userExistent = await isUserExistent(email)
    if (userExistent) {
        throw new UserDuplicated(`User duplicated for email ${email}`)
    }

    return createUser(username, email, password)
}

const isUserExistent = async (email: string): Promise<boolean> => {
    const user = await findUserByEmail(email)

    return user !== null
}

export default register
