import { Router } from 'express'

const router = Router()

router.get('/', (_, res) =>
  res.send('Welcome to Tormentum API')
)

export default router
