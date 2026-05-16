import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PROJECTS } from '@/constants/projects'
import { useApp } from '@/store/appStore'
import { ExternalLink, Code2 } from 'lucide-react'

export function ProjectModal() {
  const { selectedProject, setSelectedProject } = useApp()
  const project = PROJECTS.find((p) => p.id === selectedProject)

  return (
    <Dialog
      open={!!selectedProject}
      onOpenChange={(open) => !open && setSelectedProject(null)}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        {project && (
          <div className="space-y-4 pr-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h3 className="font-display text-2xl font-bold text-white">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              {project.github && (
                <Button variant="outline" asChild>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Code2 className="h-4 w-4" /> GitHub
                  </a>
                </Button>
              )}
              {project.live && (
                <Button variant="glow" asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
