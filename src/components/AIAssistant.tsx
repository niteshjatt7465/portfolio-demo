import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

const TIPS = [
  'Building AI-powered experiences',
  'Press ⌘K to navigate',
  'Explore my projects below',
  'Full stack · React · Three.js',
]

export function AIAssistant() {
  return (
    <motion.div
      className="fixed bottom-24 right-6 z-40 hidden md:block"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4, duration: 0.6 }}
    >
      <motion.div
        className="glass-strong flex items-start gap-3 rounded-2xl p-4 max-w-[220px] neon-border"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      >
        <div className="relative shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-violet-500/30 border border-cyan-400/30">
            <Bot className="h-5 w-5 text-cyan-300" />
          </div>
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-cyan-400/80">
            AI Assistant
          </p>
          <motion.p
            key={TIPS[Math.floor(Date.now() / 4000) % TIPS.length]}
            className="mt-1 text-xs text-zinc-400 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {TIPS[0]}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}
