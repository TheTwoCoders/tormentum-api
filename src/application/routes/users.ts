import { Router } from 'express'
import { loginController, registerController } from '@application/controllers/UsersController'
import CreateUserRequest from '@application/resources/CreateUserRequest'
import { validateRequest } from '@infra/server/validate'
import LoginRequest from '@application/resources/LoginRequest'

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
router.post('/login', async(req,res,next)=>{
  try{
    const requestObj = new LoginRequest(req.body)
    await validateRequest(requestObj)
 
    const response = await loginController(requestObj)
    res.status(200)
    res.json(response)
  }catch(e){
    next(e)
  }
})

export default router
