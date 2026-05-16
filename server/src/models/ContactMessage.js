import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
)

contactMessageSchema.index({ createdAt: -1 })
contactMessageSchema.index({ email: 1 })

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema)
