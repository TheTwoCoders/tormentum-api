import { Router } from 'express'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import { validateRequest } from '@infra/server/validate'
import LoginRequest from '@application/resources/LoginRequest'
import verifyAuthentication from '@application/middlewares/verifyAuthentication'
import DeleteUserRequest from '@application/resources/DeleteUserRequest'
import ForbiddenException from '@application/exceptions/ForbiddenException'
import UpdateUserRequest from '@application/resources/UpdateUserRequest'
import { registerController } from '@application/controllers/users/registerController'
import { loginController } from '@application/controllers/users/loginController'
import { deleteUserController } from '@application/controllers/users/deleteUserController'
import { updateUserController } from '@application/controllers/users/updateUserController'

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

router.post('/login', async (req, res, next) => {
  try {
    const requestObj = new LoginRequest(req.body)
    await validateRequest(requestObj)

    const response = await loginController(requestObj)
    res.status(200)
    res.json(response)
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', verifyAuthentication, async (req, res, next) => {
  try {
    const tokenUserId = req.userId
    const request = new DeleteUserRequest({ id: req.params.id })
    if (tokenUserId != request.id) {
      throw new ForbiddenException(`You have no permission to delete the user ${request.id}`)
    }

    const response = await deleteUserController(request)
    res.status(200)
    res.json(response)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', verifyAuthentication, async (req, res, next) => {
  try {
    const tokenUserId = req.userId
    const request = new UpdateUserRequest({ id: req.params.id, ...req.body })
    await validateRequest(request)
    if (tokenUserId != request.id) {
      throw new ForbiddenException(`You have no permission to update the user ${request.id}`)
    }

    const response = await updateUserController(request)
    res.status(200)
    res.json(response)
  } catch (e) {
    next(e)
  }
})

export default router
