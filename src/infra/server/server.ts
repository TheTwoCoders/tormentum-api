import express from 'express'
import rootRoutes from '@application/routes/root'
import healthRoutes from '@application/routes/health'
import usersRoutes from '@application/routes/users'
import { handleError } from './error'

const app = express()

app.use(express.json())

// Routes
app.use('/', rootRoutes)
app.use('/health', healthRoutes)
app.use('/users', usersRoutes)

app.use((
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  handleError(res, error)
})

const startServer = (): void => {
  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => {
    console.log(`⚡️[tormentum-api]: Server is running at http://localhost:${process.env.PORT}`)
  })
}

export { startServer, app }
