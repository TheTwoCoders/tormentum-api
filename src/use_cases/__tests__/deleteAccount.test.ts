import deleteAccount from '../deleteAccount'
import UserModel from '../../models/UserModel'
import { encryptPassword } from '../../utils/crypt'
import { connect, disconnect } from '../../database'
import UserPasswordIncorrect from '../../exceptions/UserPasswordIncorrect'
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

    describe('when passing a valid email and password', () => {
        it('deletes the account and returns Null', async () => {
            const email = 'johnDeleteTest@gmail.com'
            const password = 'password'
            await createUser(email, password)

            expect(await deleteAccount(email, password)).toEqual("ACCOUNT_DELETED")
        })
    })

    describe('when passing an invalid password', () => {
        it('throws UserPasswordIncorrect', async () => {
            const email = 'johnDeleteTest@gmail.com'
            const password = 'password2'
            const wrongPassword = 'wrongPassword'
            await createUser(email, password)

            await expect(deleteAccount(email, wrongPassword))
                .rejects
                .toThrow(UserPasswordIncorrect)
        })
    })

    describe('when passing an invalid email', () => {
        it('throws UserNotFound', async () => {
            const nonExistentEmail = 'notJohnDeleteTest@gmail.com'
            const password = 'password'

            await expect(deleteAccount(nonExistentEmail, password))
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

