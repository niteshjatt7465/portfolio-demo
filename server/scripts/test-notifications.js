import 'dotenv/config'
import { sendContactEmail } from '../src/services/emailService.js'
import { sendTelegramNotification } from '../src/services/telegramService.js'

const testPayload = {
  name: 'Test User',
  email: 'visitor@example.com',
  subject: 'Portfolio System Test',
  message: 'If you receive this on Gmail and Telegram, the system is working.',
}

console.log('Testing Nodemailer + Telegram...\n')

try {
  await sendTelegramNotification(testPayload)
  console.log('✓ Telegram OK')
} catch (err) {
  console.error('✗ Telegram:', err.message)
}

try {
  await sendContactEmail(testPayload)
  console.log('✓ Gmail OK')
} catch (err) {
  console.error('✗ Gmail:', err.message)
}

process.exit(0)
