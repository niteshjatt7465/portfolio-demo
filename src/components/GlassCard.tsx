import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl p-6 transition-all duration-500',
        hover && 'hover:border-cyan-400/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]',
        className
      )}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
