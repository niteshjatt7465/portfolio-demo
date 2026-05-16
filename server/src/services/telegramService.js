const TELEGRAM_API = 'https://api.telegram.org'

export function formatTelegramMessage({ name, email, subject, message }) {
  const time = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })

  return [
    '🔥 New Portfolio Contact',
    '',
    `👤 Name: ${name}`,
    `📧 Email: ${email}`,
    `📝 Subject: ${subject}`,
    '',
    '💬 Message:',
    message,
    '',
    `⏰ Time: ${time}`,
  ].join('\n')
}

export async function sendTelegramNotification(payload) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    throw new Error('Telegram is not configured')
  }

  const text = formatTelegramMessage(payload)
  const url = `${TELEGRAM_API}/bot${token}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  const data = await response.json()

  if (!response.ok || !data.ok) {
    throw new Error(data.description || `Telegram API error (${response.status})`)
  }

  return { sent: true, messageId: data.result?.message_id }
}
