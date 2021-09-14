import request from 'supertest'
import { app } from '@infra/server/server'

describe('Routes: Health', () => {
  describe('when calling GET /health', () => {
    it('returns status OK', async () => {
      const response = await request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        
      expect(response.body.status).toEqual('OK')
    })
  })
})
