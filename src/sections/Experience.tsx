import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { TIMELINE } from '@/constants/experience'
import { fadeUp } from '@/animations/variants'

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24 md:py-32">
      <motion.div className="mx-auto max-w-3xl">
        <SectionHeading
          label="Journey"
          title="Experience Timeline"
          subtitle="From foundations to AI-powered full stack development."
        />

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-violet-400/30 to-transparent md:-translate-x-px" />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.year + item.title}
              className={`relative flex gap-8 pb-12 md:pb-16 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
              custom={i}
            >
              <div className="hidden md:block md:w-1/2" />
              <div className="relative md:w-1/2 pl-12 md:pl-0">
                <div className="absolute left-0 md:left-auto md:right-full md:mr-8 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/50 bg-[#050508] md:-translate-x-1/2 md:translate-x-0 md:left-1/2 md:-ml-4">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                </div>
                <div className="glass rounded-2xl p-5 md:ml-8">
                  <span className="text-xs font-mono text-cyan-400">{item.year}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
