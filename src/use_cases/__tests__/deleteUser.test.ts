import deleteUser from '../deleteUser'
import UserModel from '../../models/UserModel'
import { encryptPassword } from '../../utils/crypt'
import { connect, disconnect } from '../../database'
import UserNotFound from '../../exceptions/UserNotFound'

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

    describe('when passing a valid email', () => {
        it('deletes the account and returns Null', async () => {
            const email = 'johnDeleteTest@gmail.com'
            const password = 'password'
            await createUser(email, password)

            expect(await deleteUser(email)).toBeUndefined()
        })
    })

    describe('when passing an invalid email', () => {
        it('throws UserNotFound', async () => {
            const nonExistentEmail = 'notJohnDeleteTest@gmail.com'

            await expect(deleteUser(nonExistentEmail))
                .rejects
                .toThrow(UserNotFound)
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

