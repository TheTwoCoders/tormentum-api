import { ObjectId } from 'mongoose'
import UserNotFound from '../exceptions/UserNotFound'
import { deleteUserById } from '../repositories/UserRepository'

import { findUserById } from '../repositories/UserRepository'

const deleteUser = async (id: ObjectId): Promise<void> => {
    const user = await findUserById(id)
    if (user == null) {
        throw new UserNotFound(`User not found for Id ${id}`)
    }

    await deleteUserById(id)
}

export default deleteUser
