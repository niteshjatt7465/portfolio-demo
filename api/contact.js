/**
 * Vercel serverless proxy — forwards contact form to Render backend.
 * Fixes 404 when vercel.json external rewrites don't apply.
 */
const BACKEND =
  process.env.BACKEND_URL || 'https://portfolio-demo-1-4kcp.onrender.com'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  try {
    const body =
      typeof req.body === 'string'
        ? req.body
        : JSON.stringify(req.body ?? {})

    console.log('[vercel-proxy] Forwarding contact to Render')

    const response = await fetch(`${BACKEND}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://portfolio-demo-eight-lemon.vercel.app',
      },
      body,
    })

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      console.error('[vercel-proxy] Invalid JSON from backend:', text.slice(0, 200))
      return res.status(502).json({
        success: false,
        message: 'Backend returned an invalid response',
      })
    }

    console.log('[vercel-proxy] Backend status:', response.status)
    return res.status(response.status).json(data)
  } catch (err) {
    console.error('[vercel-proxy] Error:', err.message)
    return res.status(502).json({
      success: false,
      message: 'Could not reach the server. Please try again.',
    })
  }
}
