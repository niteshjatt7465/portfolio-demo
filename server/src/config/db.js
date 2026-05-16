import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGO_URI || process.env.MONGO_URL
  if (!uri) {
    console.warn('[db] MONGO_URI / MONGO_URL not set — contact messages will not be persisted')
    return false
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('[db] Connected to MongoDB')
  return true
}
