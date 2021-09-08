import register from '../register'
import UserModel from '../../models/UserModel'
import { connect, disconnect } from '../../database'
import UserDuplicated from '../../exceptions/UserDuplicated'

describe('Use Case: Register', () => {
    beforeAll(async () => {
        await connect()
    })
    afterAll(async () => {
        await disconnect()
    })



    describe('when passing a non registered email', () => {
        it('returns the registered user', async () => {
            const username = 'John'
            const email = 'john@gmail.com'
            const password = '123456'

            await register(username, email, password)

            const user = await UserModel.findOne({ email })
            expect(user).not.toEqual(null)
        })
    })
    describe('when passing an already registered email', () => {
        it('throws UserDuplicated', async () => {
            const username = 'John'
            const email = 'john2@gmail.com'
            const password = '123456'

            await register(username, email, password)

            await expect(register(username, email, password))
                .rejects
                .toThrow(UserDuplicated)
        })
    })

})