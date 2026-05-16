import mongoose from 'mongoose'
import { ContactMessage } from '../models/ContactMessage.js'
import { sendContactEmail } from '../services/emailService.js'
import { sendTelegramNotification } from '../services/telegramService.js'

export async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.sanitizedContact

    let saved = null
    if (mongoose.connection.readyState === 1) {
      saved = await ContactMessage.create({ name, email, subject, message })
    }

    let telegramOk = false
    let emailOk = false

    try {
      await sendTelegramNotification({ name, email, subject, message })
      telegramOk = true
    } catch (err) {
      console.error('[telegram]', err.message)
    }

    try {
      await sendContactEmail({ name, email, subject, message })
      emailOk = true
    } catch (err) {
      console.error('[email]', err.message)
    }

    // Telegram is primary — succeed if Telegram OR DB saved
    if (!telegramOk && !saved) {
      return res.status(502).json({
        success: false,
        message: 'Could not deliver your message. Please try again or email me directly.',
        notifications: { email: false, telegram: false, database: false },
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      id: saved?._id,
      notifications: {
        email: emailOk,
        telegram: telegramOk,
        database: Boolean(saved),
      },
    })
  } catch (err) {
    next(err)
  }
}
