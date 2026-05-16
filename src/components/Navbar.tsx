import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Command } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/constants/site'
import { useApp, useScrollToSection } from '@/store/appStore'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { activeSection, setActiveSection, setCommandPaletteOpen } = useApp()
  const scrollTo = useScrollToSection()

  useEffect(() => {
    const onScroll = () => {
      let current = 'hero'
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id)
        if (el && el.getBoundingClientRect().top <= 200) current = link.id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [setActiveSection])

  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4 w-full max-w-fit"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-strong flex items-center gap-1 rounded-full px-2 py-2 neon-border shadow-2xl mx-auto w-fit">
        <button
          type="button"
          onClick={() => scrollTo('hero')}
          className="hidden sm:block px-3 text-xs font-display font-bold text-cyan-400"
        >
          {SITE.name.split(' ')[0]}
        </button>
        <motion.div className="flex items-center gap-0.5 overflow-x-auto max-w-[70vw] md:max-w-none scrollbar-hide">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollTo(link.id)}
              className={cn(
                'rounded-full px-2.5 md:px-3 py-1.5 text-[10px] md:text-xs font-medium whitespace-nowrap transition-all duration-300',
                activeSection === link.id
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              )}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
        <button
          type="button"
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.nav>
  )
}
