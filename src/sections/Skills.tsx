import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { SKILLS, SKILL_CATEGORIES, type SkillCategory } from '@/constants/skills'
import { cn } from '@/lib/utils'
export function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'all'>('all')

  const filtered =
    activeCategory === 'all'
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory)

  return (
    <section id="skills" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Tech Arsenal"
          subtitle="A curated stack for building premium full-stack and AI-powered applications."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <CategoryPill
            active={activeCategory === 'all'}
            onClick={() => setActiveCategory('all')}
            label="All"
          />
          {(Object.keys(SKILL_CATEGORIES) as SkillCategory[]).map((cat) => (
            <CategoryPill
              key={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              label={SKILL_CATEGORIES[cat]}
            />
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group glass rounded-2xl p-4 cursor-default transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-400/30"
              >
                <div
                  className="mb-3 h-1 rounded-full overflow-hidden bg-white/5"
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </p>
                <p className="text-[10px] text-zinc-600 mt-1">{skill.level}%</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function CategoryPill({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300',
        active
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
          : 'text-zinc-500 border border-transparent hover:text-white hover:bg-white/5'
      )}
    >
      {label}
    </button>
  )
}
