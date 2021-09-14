import { Router } from 'express'
import { registerController } from '@application/controllers/UsersController'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import { validateRequest } from '@infra/server/validate'

const router = Router()

router.post('/register', async (req, res, next) => {
  try {
    const requestObj = new CreateUserRequest(req.body)
    await validateRequest(requestObj)

    const response = await registerController(requestObj)

    res.status(201)
    res.json(response)
  } catch (e) {
    next(e)
  }
})

export default router
