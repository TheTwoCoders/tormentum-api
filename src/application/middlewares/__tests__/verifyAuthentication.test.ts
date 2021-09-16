import { Request, Response } from 'express'
import UnauthorizedException from '@application/exceptions/UnauthorizedException'
import { generateJwtToken } from '@utils/token'
import verifyAuthentication from '../verifyAuthentication'

describe('Middlewares: Authentication', () => {
  describe('when sending a valid token on Authorization', () => {
    it('calls next function', () => {
      const validToken = generateJwtToken({ id: '123' })
      const { req, res, next } = setup(validToken)

      verifyAuthentication(req, res, next)

      expect(next).toHaveBeenCalledTimes(1)
    })
  })

  describe('when sending an invalid token on Authorization', () => {
    it('throws UnauthorizedException', () => {
      const { req, res, next } = setup('invalid-token')
      
      expect(
        () => verifyAuthentication(req, res, next)
      ).toThrow(
        new UnauthorizedException('Invalid auth token provided')
      )
    })
  })

  describe('when not sending Authorization', () => {
    it('throws UnauthorizedExpection', () => {
      const { req, res, next } = setup(undefined)

      expect(
        () => verifyAuthentication(req, res, next)
      ).toThrow(
        new UnauthorizedException('You need to pass an auth token on Authorization')
      )
    })
  })

  const setup = (token: string | undefined) => ({
    req: mockReq(token),
    res: {} as Response,
    next: jest.fn()
  })

  const mockReq = (token: string | undefined): Request => {
    return {
      header: jest.fn((key) => ({
        Authorization: token ? `Bearer ${token}` : undefined
      })[key]),
    } as unknown as Request
  }
})
