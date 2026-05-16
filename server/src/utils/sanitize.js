import validator from 'validator'

export function sanitizeText(value, maxLength) {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .replace(/<[^>]*>/g, '')
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
    .slice(0, maxLength)
}

export function sanitizeEmail(email) {
  const trimmed = email.trim().toLowerCase()
  if (!validator.isEmail(trimmed)) return trimmed
  const normalized = validator.normalizeEmail(trimmed, { gmail_remove_dots: false })
  return typeof normalized === 'string' ? normalized : trimmed
}
