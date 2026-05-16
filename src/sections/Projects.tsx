import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Code2, Maximize2 } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PROJECTS } from '@/constants/projects'
import { useApp } from '@/store/appStore'
import { fadeUp } from '@/animations/variants'

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0]
  index: number
}) {
  const { setSelectedProject } = useApp()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]))
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]))

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="group glass rounded-2xl overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.12)]"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-300 border border-cyan-400/30">
            Featured
          </span>
        )}
        <button
          type="button"
          onClick={() => setSelectedProject(project.id)}
          className="absolute top-3 right-3 rounded-full glass p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Expand project"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm text-zinc-500 line-clamp-2">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        <motion.div className="mt-4 flex gap-2" style={{ transform: 'translateZ(20px)' }}>
          {project.github && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                <Code2 className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          {project.live && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Work"
          title="Featured Projects"
          subtitle="A selection of AI-powered applications and premium web experiences."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
