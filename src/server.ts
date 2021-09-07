import express from 'express'
import rootRoutes from './routes/root'
import healthRoutes from './routes/health'

const app = express()

// Routes
app.use('/', rootRoutes)
app.use('/health', healthRoutes)

const startServer = () => {
  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => {
    // tslint:disable-next-line: no-console
    console.log(`⚡️[tormentum-api]: Server is running at http://localhost:${PORT}`)
  })
}

export { startServer }
