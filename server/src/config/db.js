import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.warn('[db] MONGO_URI not set — contact messages will not be persisted')
    return false
  }

  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log('[db] Connected to MongoDB')
  return true
}
