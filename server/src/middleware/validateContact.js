import { body, validationResult } from 'express-validator'
import { sanitizeEmail, sanitizeText } from '../utils/sanitize.js'

export const contactValidationRules = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be at least 2 characters'),
  body('email').trim().isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('subject')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Subject must be at least 2 characters'),
  body('message')
    .trim()
    .isLength({ min: 5, max: 5000 })
    .withMessage('Message must be at least 5 characters'),
]

export function handleValidation(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.warn('[contact] Validation failed:', errors.array())
    return res.status(400).json({
      success: false,
      message: 'Please check your form and try again.',
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
