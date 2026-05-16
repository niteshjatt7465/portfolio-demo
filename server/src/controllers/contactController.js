import mongoose from 'mongoose'
import { ContactMessage } from '../models/ContactMessage.js'
import { sendContactEmail } from '../services/emailService.js'
import { sendTelegramNotification } from '../services/telegramService.js'

export async function submitContact(req, res, next) {
  const { name, email, subject, message } = req.sanitizedContact

  console.log('[contact] ─────────────────────────────')
  console.log('[contact] Request received')
  console.log('[contact] From:', name, `<${email}>`)
  console.log('[contact] Subject:', subject)

  try {
    // 1. Save to MongoDB
    if (mongoose.connection.readyState !== 1) {
      console.error('[contact] MongoDB not connected')
      return res.status(503).json({
        success: false,
        message: 'Database is temporarily unavailable. Please try again later.',
      })
    }

    const saved = await ContactMessage.create({ name, email, subject, message })
    console.log('[contact] MongoDB saved — id:', saved._id.toString())

    // 2. Send Gmail via Nodemailer
    let emailOk = false
    try {
      await sendContactEmail({ name, email, subject, message })
      emailOk = true
    } catch (emailErr) {
      console.error('[contact] Email failed:', emailErr.message)
    }

    // 3. Send Telegram
    let telegramOk = false
    try {
      await sendTelegramNotification({ name, email, subject, message })
      telegramOk = true
    } catch (telegramErr) {
      console.error('[contact] Telegram failed:', telegramErr.message)
    }

    const notifications = {
      email: emailOk,
      telegram: telegramOk,
      database: true,
    }

    if (!emailOk && !telegramOk) {
      console.error('[contact] All notifications failed')
      return res.status(502).json({
        success: false,
        message:
          'Message saved but notifications failed. Please email niteshsagar58@gmail.com directly.',
        id: saved._id,
        notifications,
      })
    }

    if (!telegramOk || !emailOk) {
      const failed = [!emailOk && 'email', !telegramOk && 'telegram'].filter(Boolean).join(' & ')
      console.warn(`[contact] Partial success — failed: ${failed}`)
      return res.status(201).json({
        success: true,
        message: `Message received! Some notifications (${failed}) may be delayed.`,
        id: saved._id,
        notifications,
      })
    }

    console.log('[contact] All notifications sent successfully')
    console.log('[contact] ─────────────────────────────')

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      id: saved._id,
      notifications,
    })
  } catch (err) {
    console.error('[contact] Fatal error:', err.message)
    next(err)
  }
}
