import { useCallback, useRef, useState } from 'react'
import { submitContactForm, type ContactFormData } from '@/lib/api/contact'
import type { ToastType } from '@/components/ContactToast'

const INITIAL: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [toast, setToast] = useState<{ open: boolean; type: ToastType; message: string }>({
    open: false,
    type: 'success',
    message: '',
  })
  const isSubmitting = useRef(false)

  const updateField = useCallback(
    (field: keyof ContactFormData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
      },
    []
  )

  const showToast = useCallback((type: ToastType, message: string) => {
    setToast({ open: true, type, message })
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 6000)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (isSubmitting.current) return

      isSubmitting.current = true
      setLoading(true)
      setSubmitted(false)

      try {
        const result = await submitContactForm(form)

        setSubmitted(true)
        setForm(INITIAL)
        showToast(
          'success',
          result.message || 'Message sent successfully! I will get back to you soon.'
        )
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Could not send message. Please try again.'
        showToast('error', message)
        setSubmitted(false)
      } finally {
        setLoading(false)
        isSubmitting.current = false
      }
    },
    [form, showToast]
  )

  const resetForm = useCallback(() => {
    setSubmitted(false)
    setForm(INITIAL)
  }, [])

  const closeToast = useCallback(() => {
    setToast((t) => ({ ...t, open: false }))
  }, [])

  return {
    form,
    loading,
    submitted,
    toast,
    updateField,
    handleSubmit,
    resetForm,
    closeToast,
  }
}
