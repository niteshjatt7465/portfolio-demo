import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/constants/social'

export function SocialDock() {
  return (
    <motion.div
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex flex-col gap-3"
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.8 }}
    >
      {SOCIAL_LINKS.map((social, i) => (
        <motion.a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-500 transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]`}
          whileHover={{ x: 4 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3 + i * 0.1 }}
          aria-label={social.name}
        >
          <social.icon className="h-4 w-4" />
        </motion.a>
      ))}
    </motion.div>
  )
}
