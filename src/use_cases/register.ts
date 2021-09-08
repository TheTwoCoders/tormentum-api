import UserModel, { User } from '../models/UserModel'
import { encryptPassword } from '../utils/crypt'
import UserDuplicated from '../exceptions/UserDuplicated'

const register = async (username: string, email: string, password: string): Promise<User> => {
    const userExistent = await isUserExistent(email)
    if (userExistent) {
        throw new UserDuplicated(`User duplicated for email ${email}`)
    }

    const user = new UserModel({
        username,
        email,
        password: encryptPassword(password)
    })
    return user.save()
}

const isUserExistent = async (email: string): Promise<boolean> => {
    const user = await UserModel.findOne({ email })
    return user !== null
}

export default register