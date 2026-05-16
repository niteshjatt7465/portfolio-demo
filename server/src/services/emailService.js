const EMAILJS_API = 'https://api.emailjs.com/api/v1.0/email/send'

/**
 * Sends contact form data to your Gmail via EmailJS.
 * Template params (configure in EmailJS dashboard):
 * - from_name, from_email, subject, message, reply_to, time
 */
export async function sendContactEmail({ name, email, subject, message }) {
  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS is not configured')
  }

  const time = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })

  const response = await fetch(EMAILJS_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject,
        message,
        time,
      },
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`EmailJS failed (${response.status}): ${text}`)
  }

  return { sent: true, time }
}
