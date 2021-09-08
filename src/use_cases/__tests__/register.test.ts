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

})