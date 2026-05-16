import { lazy, Suspense } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SITE } from '@/constants/site'
import { useTypewriter } from '@/hooks/useTypewriter'
import { useScrollToSection } from '@/store/appStore'
import { MagneticButton } from '@/components/MagneticButton'
import { fadeUp, staggerContainer } from '@/animations/variants'

const HeroScene = lazy(() =>
  import('@/components/three/HeroScene').then((m) => ({ default: m.HeroScene }))
)

export function Hero() {
  const scrollTo = useScrollToSection()
  const tagline = useTypewriter(SITE.tagline, 45, 1200)
  const { x, y } = useMousePosition()
  const w = typeof window !== 'undefined' ? window.innerWidth : 1
  const h = typeof window !== 'undefined' ? window.innerHeight : 1
  const mouse = { x: (x / w - 0.5) * 2, y: -(y / h - 0.5) * 2 }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      <Suspense fallback={null}>
        <HeroScene mouse={mouse} />
      </Suspense>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          custom={0}
          className="mb-4 text-xs font-medium tracking-[0.4em] uppercase text-cyan-400/90"
        >
          Welcome to the future
        </motion.p>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="font-display text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl neon-text"
        >
          {SITE.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="mt-4 text-xl text-zinc-400 md:text-2xl"
        >
          {SITE.role}
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mt-3 h-8 font-mono text-sm text-cyan-300/90 md:text-base"
        >
          {tagline.display}
          <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="glow" size="lg" onClick={() => scrollTo('projects')}>
            View Projects
          </MagneticButton>
          <MagneticButton variant="outline" size="lg" onClick={() => scrollTo('contact')}>
            Contact Me
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollTo('about')}
        className="absolute bottom-28 z-10 flex flex-col items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        aria-label="Scroll to about"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </motion.button>
    </section>
  )
}
