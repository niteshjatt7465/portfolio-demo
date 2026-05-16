import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { AI_FEATURES } from '@/constants/ai'
import { fadeUp, staggerContainer } from '@/animations/variants'

function AINode({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
      style={{ left: x, top: y }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 2, delay }}
    />
  )
}

export function AI() {
  return (
    <section id="ai" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${10 + i * 15}%`}
              y1="20%"
              x2={`${30 + i * 10}%`}
              y2="80%"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          ))}
        </svg>
        <AINode x="20%" y="30%" delay={0} />
        <AINode x="50%" y="20%" delay={0.5} />
        <AINode x="75%" y="40%" delay={1} />
        <AINode x="35%" y="70%" delay={1.5} />
        <AINode x="80%" y="75%" delay={0.8} />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Artificial Intelligence"
          title="AI-Powered Solutions"
          subtitle="Integrating intelligence into every layer — from chatbots to adaptive learning systems."
        />

        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {AI_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              custom={i}
              className="glass group rounded-2xl p-6 transition-all duration-500 hover:border-fuchsia-400/30 hover:shadow-[0_0_40px_rgba(232,121,249,0.1)]"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white group-hover:text-fuchsia-300 transition-colors">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
