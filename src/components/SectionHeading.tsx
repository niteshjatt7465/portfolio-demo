import { motion } from 'framer-motion'
import { fadeUp } from '@/animations/variants'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  subtitle,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-16 md:mb-20',
        align === 'center' && 'text-center mx-auto max-w-3xl',
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
    >
      <span className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-400/80">
        {label}
      </span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-zinc-400 md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
