import { motion } from 'framer-motion'
import { Code2, Sparkles, Zap, Globe } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { GlassCard } from '@/components/GlassCard'
import { STATS } from '@/constants/experience'
import { useCounter } from '@/hooks/useCounter'
import { fadeUp, staggerContainer } from '@/animations/variants'

const FLOATING_ICONS = [Code2, Sparkles, Zap, Globe]

function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { count, ref } = useCounter(value, 2000)

  return (
    <GlassCard className="text-center">
      <div ref={ref} className="font-display text-4xl font-bold text-white md:text-5xl">
        {count}
        <span className="text-cyan-400">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-zinc-500">{label}</p>
    </GlassCard>
  )
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Crafting Digital Experiences"
          subtitle="Full stack developer passionate about building immersive, AI-powered web applications with cinematic quality."
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="relative"
          >
            {FLOATING_ICONS.map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute glass flex h-12 w-12 items-center justify-center rounded-xl text-cyan-400"
                style={{
                  top: `${15 + i * 20}%`,
                  left: i % 2 === 0 ? '0%' : '70%',
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.2 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
            ))}
            <GlassCard className="relative z-10">
              <p className="text-zinc-300 leading-relaxed">
                I&apos;m <span className="text-white font-medium">Nitesh Sagar</span>, a Full
                Stack Developer specializing in React, Node.js, and AI integrations. I build
                products that blend cutting-edge technology with premium design — from intelligent
                study planners to immersive 3D portfolios.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed text-sm">
                My focus: performant architectures, buttery animations, and experiences that feel
                expensive. Every pixel is intentional. Every interaction tells a story.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i}>
                <StatCard {...stat} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
