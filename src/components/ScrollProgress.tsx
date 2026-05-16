import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400"
      style={{ scaleX: progress }}
    />
  )
}
