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

    const [emailResult, telegramResult] = await Promise.allSettled([
      sendContactEmail({ name, email, subject, message }),
      sendTelegramNotification({ name, email, subject, message }),
    ])

    const emailOk = emailResult.status === 'fulfilled'
    const telegramOk = telegramResult.status === 'fulfilled'

    if (!emailOk) {
      console.error('[email]', emailResult.reason?.message)
    }
    if (!telegramOk) {
      console.error('[telegram]', telegramResult.reason?.message)
    }

    if (!emailOk && !telegramOk) {
      return res.status(502).json({
        success: false,
        message: 'Could not deliver your message. Please email me directly.',
        notifications: { email: false, telegram: false },
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
