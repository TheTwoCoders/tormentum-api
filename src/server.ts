import express from 'express'
import rootRoutes from './routes/root'
import healthRoutes from './routes/health'

const app = express()

// Routes
app.use('/', rootRoutes)
app.use('/health', healthRoutes)

const startServer = (): void => {
  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => {
    console.log(`⚡️[tormentum-api]: Server is running at http://localhost:${process.env.PORT}`)
  })
}

export { startServer }