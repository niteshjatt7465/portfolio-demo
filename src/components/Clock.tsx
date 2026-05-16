import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="fixed top-6 right-6 z-40 hidden md:block glass rounded-full px-4 py-2 text-xs font-mono text-zinc-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
    >
      {time.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}
    </motion.div>
  )
}
