import nodemailer from 'nodemailer'

function getAppPassword() {
  return process.env.EMAIL_PASS?.replace(/\s/g, '') ?? ''
}

function createTransporter() {
  const user = process.env.EMAIL_USER
  const pass = getAppPassword()

  if (!user || !pass) {
    throw new Error('EMAIL_USER or EMAIL_PASS is not configured')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  })
}

function buildHtmlEmail({ name, email, subject, message, time }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050508;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050508;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0c0c12;border:1px solid rgba(34,211,238,0.2);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg,#22d3ee22,#a78bfa22);padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <h1 style="margin:0;color:#22d3ee;font-size:22px;font-weight:700;">🔥 New Portfolio Contact</h1>
              <p style="margin:8px 0 0;color:#a1a1aa;font-size:13px;">Nitesh Sagar Portfolio</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Name</span><br>
                    <span style="color:#f4f4f5;font-size:16px;font-weight:600;">${escapeHtml(name)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Email</span><br>
                    <a href="mailto:${escapeHtml(email)}" style="color:#22d3ee;font-size:16px;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Subject</span><br>
                    <span style="color:#f4f4f5;font-size:16px;">${escapeHtml(subject)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;">
                    <span style="color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Message</span><br>
                    <p style="color:#d4d4d8;font-size:15px;line-height:1.7;margin:8px 0 0;white-space:pre-wrap;">${escapeHtml(message)}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px;background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;color:#71717a;font-size:12px;">⏰ ${escapeHtml(time)}</p>
              <p style="margin:8px 0 0;color:#52525b;font-size:11px;">Reply directly to ${escapeHtml(email)}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function sendContactEmail({ name, email, subject, message }) {
  const time = new Date().toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  })

  const transporter = createTransporter()
  const to = process.env.EMAIL_USER

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${to}>`,
    to,
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: [
      'New Portfolio Contact',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      'Message:',
      message,
      '',
      `Time: ${time}`,
    ].join('\n'),
    html: buildHtmlEmail({ name, email, subject, message, time }),
  })

  console.log('[email] Sent successfully — messageId:', info.messageId)
  return { sent: true, messageId: info.messageId }
}
