import deleteUser from '../deleteUser'
import UserModel from '../../models/UserModel'
import { encryptPassword } from '../../utils/crypt'
import { connect, disconnect } from '../../database'
import UserNotFound from '../../exceptions/UserNotFound'
import deleteAccount from '../deleteUser'

describe('Use Case: deleteAccount', () => {
    let connection = null

    beforeAll(async () => {
        connection = await connect(global.__MONGO_DB_NAME__)
    })

    afterAll(async () => {
        await disconnect(connection)
    })

    beforeEach(async () => {
        await UserModel.deleteMany({})
    })

    describe('when passing a valid Id', () => {
        it('deletes the user and returns Null', async () => {
            const email = 'johnDeleteTest@gmail.com'
            const password = 'password'
            await createUser(email, password)
            const user = await UserModel.findOne({ email })
            const id = user._id
            await deleteAccount(id)

            const deletedUser = await UserModel.findOne({ email })
            expect(deletedUser).toBeNull()
        })
    })

    describe('when passing a invalid Id', () => {
        it('throws UserNotFound', async () => {
            const email = 'johnDontDeleteTest@gmail.com'
            const password = 'password'
            await createUser(email, password)
            const user = await UserModel.findOne({ email })
            const id = user._id

            await deleteUser(id)

            await expect(deleteUser(id)).rejects.toThrow(UserNotFound)
        })
    })

    const createUser = async (email: string, password: string) => {
        const user = new UserModel({
            username: 'John',
            email,
            password: encryptPassword(password)
        })

        return user.save()
    }
})

