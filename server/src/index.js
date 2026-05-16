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
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean)

// Allow all Vercel preview/production URLs
function isOriginAllowed(origin) {
  if (!origin) return true
  const normalized = origin.replace(/\/$/, '')
  if (allowedOrigins.includes(normalized)) return true
  if (/^https:\/\/[\w-]+\.vercel\.app$/.test(normalized)) return true
  return false
}

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        callback(null, true)
      } else {
        console.warn('[cors] Blocked:', origin)
        callback(null, false)
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)
app.use(express.json({ limit: '16kb' }))

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    mongo: 'checking',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/contact', contactRoutes)

app.use(errorHandler)

await connectDB()

app.listen(PORT, () => {
  console.log(`[server] Running on port ${PORT}`)
  console.log('[server] Allowed origins:', allowedOrigins.join(', '))
})
