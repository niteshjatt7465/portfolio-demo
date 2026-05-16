import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { NAV_LINKS } from '@/constants/site'
import { useApp, useScrollToSection } from '@/store/appStore'

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useApp()
  const scrollTo = useScrollToSection()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
      if (e.key === 'Escape') setCommandPaletteOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            className="fixed left-1/2 top-[20%] z-[91] w-full max-w-lg -translate-x-1/2 px-4"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            <div className="glass-strong rounded-2xl neon-border overflow-hidden">
              <motion.div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <Search className="h-4 w-4 text-zinc-500" />
                <span className="text-sm text-zinc-400">Jump to section...</span>
              </motion.div>
              <div className="p-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => {
                      scrollTo(link.id)
                      setCommandPaletteOpen(false)
                    }}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    {link.label}
                    <span className="text-xs text-zinc-600">↵</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
