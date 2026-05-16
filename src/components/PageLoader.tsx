import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '@/store/appStore'

export function PageLoader() {
  const { isLoading, setLoading } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [setLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050508]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="font-display text-4xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            NS
          </motion.div>
          <motion.div
            className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </motion.div>
          <motion.p
            className="mt-4 text-xs tracking-[0.4em] uppercase text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
