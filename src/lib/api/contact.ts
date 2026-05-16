import { CONTACT_API_URL } from '@/constants/api'
import type { ContactFormData } from './types'

export type { ContactFormData } from './types'

export interface ContactApiResponse {
  success: boolean
  message: string
  errors?: { field: string; message: string }[]
  notifications?: {
    email: boolean
    telegram: boolean
    database: boolean
  }
}

const REQUEST_TIMEOUT_MS = 45_000

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  let response: Response

  try {
    response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal,
    })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error(
        'Request took too long. Your message may have been sent — please check Telegram or try again.'
      )
    }
    throw new Error(
      'Cannot reach the server. Please check your internet and try again.'
    )
  } finally {
    clearTimeout(timeoutId)
  }

  let result: ContactApiResponse
  try {
    result = await response.json()
  } catch {
    throw new Error(
      'Server error. Please email niteshsagar58@gmail.com directly.'
    )
  }

  if (!response.ok || !result.success) {
    const detail =
      result.errors?.map((e) => e.message).join('. ') || result.message
    throw new Error(detail || 'Failed to send message')
  }

  return result
}
