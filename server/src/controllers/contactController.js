import mongoose from 'mongoose'
import { ContactMessage } from '../models/ContactMessage.js'
import { sendContactEmail } from '../services/emailService.js'
import { sendTelegramNotification } from '../services/telegramService.js'

export async function submitContact(req, res, next) {
  const { name, email, subject, message } = req.sanitizedContact

  console.log('[contact] ─────────────────────────────')
  console.log('[contact] NEW submission from:', name, `<${email}>`)
  console.log('[contact] Subject:', subject)

  try {
    // 1. Save to MongoDB (non-blocking if fails)
    let saved = null
    if (mongoose.connection.readyState === 1) {
      try {
        saved = await ContactMessage.create({ name, email, subject, message })
        console.log('[contact] MongoDB saved:', saved._id.toString())
      } catch (dbErr) {
        console.error('[contact] MongoDB save failed:', dbErr.message)
      }
    } else {
      console.warn('[contact] MongoDB not connected — skipping save')
    }

    // 2. Telegram (required — instant phone notification)
    let telegramOk = false
    try {
      await sendTelegramNotification({ name, email, subject, message })
      telegramOk = true
    } catch (telegramErr) {
      console.error('[contact] Telegram FAILED:', telegramErr.message)
    }

    // 3. Gmail via Nodemailer
    let emailOk = false
    try {
      await sendContactEmail({ name, email, subject, message })
      emailOk = true
    } catch (emailErr) {
      console.error('[contact] Email FAILED:', emailErr.message)
    }

    const notifications = {
      email: emailOk,
      telegram: telegramOk,
      database: Boolean(saved),
    }

    if (!telegramOk) {
      console.error('[contact] CRITICAL: Telegram not sent')
      return res.status(502).json({
        success: false,
        message:
          'Could not deliver your message. Please email niteshsagar58@gmail.com directly.',
        notifications,
      })
    }

    console.log('[contact] SUCCESS — telegram:', telegramOk, 'email:', emailOk, 'db:', Boolean(saved))
    console.log('[contact] ─────────────────────────────')

    return res.status(201).json({
      success: true,
      message: emailOk
        ? 'Message sent successfully! I will get back to you soon.'
        : 'Message received! I will get back to you soon.',
      id: saved?._id,
      notifications,
    })
  } catch (err) {
    console.error('[contact] Fatal error:', err.message)
    next(err)
  }
}
