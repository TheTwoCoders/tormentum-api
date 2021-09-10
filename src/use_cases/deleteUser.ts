import { ObjectId } from 'mongoose'
import UserNotFound from '../exceptions/UserNotFound'
import UserModel from '../models/UserModel'

const deleteAccount = async (_id: ObjectId): Promise<void> => {
    const user = await UserModel.findOne({ _id })
    if (user == null) {
        throw new UserNotFound(`User not found for Id ${_id}`)
    }

    await user.deleteOne()
}

export default deleteAccount
