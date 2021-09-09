import UserNotFound from '../exceptions/UserNotFound'
import UserModel from '../models/UserModel'

const deleteAccount = async (email: string): Promise<void> => {
    const user = await UserModel.findOne({ email })

    if (user == null) {
        throw new UserNotFound(`User not found for email ${email}`)
    }

    await user.deleteOne()
}

export default deleteAccount
