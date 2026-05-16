import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error'

interface ContactToastProps {
  open: boolean
  type: ToastType
  message: string
  onClose: () => void
}

export function ContactToast({ open, type, message, onClose }: ContactToastProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="alert"
          initial={{ opacity: 0, y: -24, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -24, x: '-50%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'fixed top-6 left-1/2 z-[120] flex w-[calc(100%-2rem)] max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl',
            type === 'success'
              ? 'border-emerald-400/30 bg-emerald-950/80 text-emerald-100'
              : 'border-red-400/30 bg-red-950/80 text-red-100'
          )}
        >
          {type === 'success' ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
          )}
          <p className="flex-1 text-sm font-medium leading-snug">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full p-1 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
