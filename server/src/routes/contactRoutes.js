import { Router } from 'express'
import { submitContact } from '../controllers/contactController.js'
import { contactRateLimiter } from '../middleware/rateLimiter.js'
import {
  contactValidationRules,
  handleValidation,
} from '../middleware/validateContact.js'

const router = Router()

router.post(
  '/',
  contactRateLimiter,
  contactValidationRules,
  handleValidation,
  submitContact
)

export default router
