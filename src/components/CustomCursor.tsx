import { motion } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function CustomCursor() {
  const { x, y } = useMousePosition()
  const isDesktop = useMediaQuery('(pointer: fine)')

  if (!isDesktop) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        animate={{ x: x - 8, y: y - 8 }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.5 }}
      >
        <motion.div
          className="h-4 w-4 rounded-full bg-white"
          whileHover={{ scale: 1.5 }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9998] h-8 w-8 rounded-full border border-cyan-400/40"
        animate={{ x: x - 16, y: y - 16 }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      />
    </>
  )
}
