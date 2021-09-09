import UserNotFound from '../exceptions/UserNotFound'
import UserPasswordIncorrect from '../exceptions/UserPasswordIncorrect'
import UserModel from '../models/UserModel'
import { verifyPassword } from '../utils/crypt'

const deleteAccount = async (email: string, password: string): Promise<string> => {
    const user = await UserModel.findOne({ email })

    if (user == null) {
        throw new UserNotFound(`User not found for email ${email}`)
    }
    const isPasswordCorrect = verifyPassword(password, user.password)
    if (isPasswordCorrect != true) {
        throw new UserPasswordIncorrect(`Password incorrect for email ${email}`)
    }
    await user.deleteOne()

    return "ACCOUNT_DELETED"
}

export default deleteAccount
