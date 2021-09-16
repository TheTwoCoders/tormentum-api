import { Mongoose } from 'mongoose'
import request from 'supertest'
import { connect, disconnect } from '@infra/database/database'
import { createUser, deleteAllUsers, deleteUserById } from '@domain/repositories/UserRepository'
import { app } from '@infra/server/server'
import mockUser from '@testHelpers/mockUser'
import Authentication from '@domain/entities/Authentication'

describe('Routes: Users', () => {
  let connection: Mongoose | null = null

  beforeAll(async () => {
    connection = await connect(global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    await disconnect(connection)
  })

  beforeEach(() => {
    deleteAllUsers()
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

    describe('and passing an invalid email', () => {
      it('returns status 400 with validation error', async () => {
        const invalidEmail = 'abc123'
        const response = await request(app)
          .post('/users/register')
          .send({
            username: 'test',
            email: invalidEmail,
            password: '123456'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
        
        expect(response.body.message).toEqual('Validation error')
        expect(response.body.details).toEqual([{
          property: 'email',
          message: '{"isEmail":"email must be an email"}'
        }])
      })
    })
  })

  describe('when calling POST /users/login', () => {
    describe('and passing a non existent email', () => {
      it('returns status 404 not found', async () => {
        const email = 'notFound@email.com'
        const password= '123456'
        const response = await request(app)
          .post('/users/login')
          .send({
            email,
            password,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)

        expect(response.body.message).toEqual(`User not found for email ${email}`)
      })
    })

    describe('and passing an incorrect password', () => {
      it('returns status 400 bad request', async () => {
        const email = 'notFound@email.com'
        const password= '123456'
        await mockUser(email, password)
        const response = await request(app)
          .post('/users/login')
          .send({
            email,
            password: 'wrongPassword',
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)

        expect(response.body.message).toEqual(`Password incorrect for email ${email}`)
      })
    })

    describe('and passing an invalid email', () => {
      it('returns status 400 with validation error', async () => {
        const email = 'login1231254'
        const password= '123456'
        const response = await request(app)
          .post('/users/login')
          .send({
            email,
            password,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)

        expect(response.body.message).toEqual('Validation error')
        expect(response.body.details).toEqual([{
          property: 'email',
          message: '{"isEmail":"email must be an email"}'
        }])
      })
    })

    describe('and passing valid parameters', () => {
      it('returns the authentication token', async () => {
        const email = 'login@email.com'
        const password= '123456'
        await mockUser(email, password)
        const response = await request(app)
          .post('/users/login')
          .send({
            email,
            password,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)

        expect(response.body.token).not.toBeNull()
      })
    })
  })

  describe('when calling DELETE /users/:id', () => {
    describe('and passing a valid token with valid id', () => {
      it('deletes the user returning the deleted id', async () => {
        const user = await mockUser()
        const auth = new Authentication(user)

        const response = await request(app)
          .delete(`/users/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${auth.token}`)
          .expect('Content-Type', /json/)
          .expect(200)

        expect(response.body.id).toEqual(user.id)
      })
    })

    describe('and passing an invalid token', () => {
      it('returns 401 unauthorized', async () => {
        const user = await mockUser()

        const response = await request(app)
          .delete(`/users/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer invalid-token')
          .expect('Content-Type', /json/)
          .expect(401)

        expect(response.body.message).toEqual('Invalid auth token provided')
      })
    })

    describe('and passing a valid token with invalid id', () => {
      it('returns 403 forbidden', async () => {
        const user = await mockUser()
        const auth = new Authentication(user)
        const invalidUserId = 'invalid-user-id'

        const response = await request(app)
          .delete(`/users/${invalidUserId}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${auth.token}`)
          .expect('Content-Type', /json/)
          .expect(403)

        expect(response.body.message)
          .toEqual(`You have no permission to delete the user ${invalidUserId}`)
      })
    })

    describe('and passing an already deleted user', () => {
      it('returns 404 not found', async () => {
        const user = await mockUser()
        const auth = new Authentication(user)
        await deleteUserById(user.id)

        const response = await request(app)
          .delete(`/users/${user.id}`)
          .set('Accept', 'application/json')
          .set('Authorization', `Bearer ${auth.token}`)
          .expect('Content-Type', /json/)
          .expect(404)

        expect(response.body.message)
          .toEqual(`User not found for Id ${user.id}`)
      })
    })
  })
})
