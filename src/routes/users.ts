import { Router } from 'express'
import { registerController } from '../controllers/UsersController'
import CreateUserRequest from '../resources/CreateUserRequest'
import { validateRequest } from '../server/validate'

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
