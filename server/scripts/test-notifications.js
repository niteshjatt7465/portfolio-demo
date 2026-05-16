import 'dotenv/config'
import { sendContactEmail } from '../src/services/emailService.js'
import { sendTelegramNotification } from '../src/services/telegramService.js'

const testPayload = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Portfolio System Test',
  message: 'If you receive this, Email + Telegram are working correctly.',
}

console.log('Testing notifications...\n')

try {
  await sendTelegramNotification(testPayload)
  console.log('✓ Telegram notification sent')
} catch (err) {
  console.error('✗ Telegram failed:', err.message)
}

try {
  await sendContactEmail(testPayload)
  console.log('✓ Email sent via EmailJS')
} catch (err) {
  console.error('✗ Email failed:', err.message)
}

process.exit(0)
