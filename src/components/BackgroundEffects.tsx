import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

export function BackgroundEffects() {
  const { x, y } = useMousePosition()

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] gradient-mesh"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed z-[2] h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.4) 0%, transparent 70%)',
          left: x - 250,
          top: y - 250,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
      <div className="pointer-events-none fixed inset-0 z-[1] grid-floor opacity-30" aria-hidden />
    </>
  )
}
