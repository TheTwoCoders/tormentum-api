import request from 'supertest'
import { connect, disconnect } from '../../database'
import { createUser, deleteAllUsers } from '../../repositories/UserRepository'
import { app } from '../../server'

describe('Routes: Users', () => {
  let connection = null

  beforeAll(async () => {
    connection = await connect(global.__MONGO_DB_NAME__)
    deleteAllUsers()
  })

  afterAll(async () => {
    await disconnect(connection)
  })

  describe('when calling POST /users/register', () => {
    describe('and passing valid parameters', () => {
      it('returns the created user id', async () => {
        const response = await request(app)
          .post('/users/register')
          .send({
            username: 'test',
            email: 'test@test.com',
            password: '123456'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
        
        expect(response.body.id).not.toBeNull()
      })
    })

    describe('and passing an already existent email', () => {
      it('returns status 409 conflict', async () => {
        const user = await createUser('test', 'existent@test.com', '123456')
        const response = await request(app)
          .post('/users/register')
          .send({
            username: 'test',
            email: user.email,
            password: '123456'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(409)
        
        expect(response.body.message).toEqual(`User duplicated for email ${user.email}`)
        expect(response.body.details).toEqual([])
      })
    })
  })
})
