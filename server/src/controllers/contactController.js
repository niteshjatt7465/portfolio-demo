import mongoose from 'mongoose'
import { ContactMessage } from '../models/ContactMessage.js'
import { sendContactEmail } from '../services/emailService.js'
import { sendTelegramNotification } from '../services/telegramService.js'
import { withTimeout } from '../utils/timeout.js'

const TELEGRAM_TIMEOUT_MS = 15_000
const EMAIL_TIMEOUT_MS = 12_000

export async function submitContact(req, res, next) {
  const { name, email, subject, message } = req.sanitizedContact

  console.log('[contact] ─────────────────────────────')
  console.log('[contact] NEW submission from:', name, `<${email}>`)

  try {
    let saved = null
    if (mongoose.connection.readyState === 1) {
      try {
        saved = await ContactMessage.create({ name, email, subject, message })
        console.log('[contact] MongoDB saved:', saved._id.toString())
      } catch (dbErr) {
        console.error('[contact] MongoDB save failed:', dbErr.message)
      }
    }

    // Telegram + Email in parallel (don't block UI on slow Gmail SMTP)
    const [telegramResult, emailResult] = await Promise.allSettled([
      withTimeout(sendTelegramNotification({ name, email, subject, message }), TELEGRAM_TIMEOUT_MS, 'Telegram'),
      withTimeout(sendContactEmail({ name, email, subject, message }), EMAIL_TIMEOUT_MS, 'Email'),
    ])

    const telegramOk = telegramResult.status === 'fulfilled'
    const emailOk = emailResult.status === 'fulfilled'

    if (!telegramOk) {
      console.error('[contact] Telegram FAILED:', telegramResult.reason?.message)
    }
    if (!emailOk) {
      console.error('[contact] Email FAILED:', emailResult.reason?.message)
    }

    const notifications = {
      email: emailOk,
      telegram: telegramOk,
      database: Boolean(saved),
    }

    if (!telegramOk) {
      return res.status(502).json({
        success: false,
        message:
          'Could not deliver your message. Please email niteshsagar58@gmail.com directly.',
        notifications,
      })
    }

    console.log('[contact] DONE — telegram:', telegramOk, 'email:', emailOk)
    console.log('[contact] ─────────────────────────────')

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      id: saved?._id,
      notifications,
    })
  } catch (err) {
    console.error('[contact] Fatal error:', err.message)
    next(err)
  }
}
