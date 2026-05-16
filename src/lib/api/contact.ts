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

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  let response: Response

  try {
    response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } catch {
    throw new Error(
      'Cannot reach the server. Please check your internet and try again.'
    )
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

  if (!result.notifications?.telegram) {
    throw new Error(
      'Notification failed. Please email niteshsagar58@gmail.com directly.'
    )
  }

  return result
}
