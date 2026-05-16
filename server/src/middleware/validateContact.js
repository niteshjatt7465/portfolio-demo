import { body, validationResult } from 'express-validator'
import { sanitizeEmail, sanitizeText } from '../utils/sanitize.js'

export const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be 2–100 characters')
    .matches(/^[\p{L}\p{N}\s.'-]+$/u)
    .withMessage('Name contains invalid characters'),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('subject')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Subject must be 3–200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be 10–5000 characters'),
]

export function handleValidation(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    })
  }

  req.sanitizedContact = {
    name: sanitizeText(req.body.name, 100),
    email: sanitizeEmail(req.body.email),
    subject: sanitizeText(req.body.subject, 200),
    message: sanitizeText(req.body.message, 5000),
  }

  next()
}
