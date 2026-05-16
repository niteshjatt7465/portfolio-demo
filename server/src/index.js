import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      if (/^https:\/\/[\w-]+\.vercel\.app$/.test(origin)) return callback(null, true)
      callback(null, false)
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)
app.use(express.json({ limit: '16kb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/contact', contactRoutes)

app.use(errorHandler)

try {
  await connectDB()
} catch (err) {
  console.error('[db] Connection failed:', err.message)
}

app.listen(PORT, () => {
  console.log(`[server] Running on port ${PORT}`)
})
