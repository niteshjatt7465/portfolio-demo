export type SkillCategory = 'frontend' | 'backend' | 'animation' | 'devops' | 'ai'

export interface Skill {
  name: string
  category: SkillCategory
  level: number
  color: string
}

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  animation: 'Motion & 3D',
  devops: 'DevOps',
  ai: 'AI & Auth',
}

export const SKILLS: Skill[] = [
  { name: 'HTML5', category: 'frontend', level: 95, color: '#f97316' },
  { name: 'CSS3', category: 'frontend', level: 92, color: '#3b82f6' },
  { name: 'JavaScript', category: 'frontend', level: 94, color: '#eab308' },
  { name: 'TypeScript', category: 'frontend', level: 90, color: '#2563eb' },
  { name: 'React JS', category: 'frontend', level: 93, color: '#22d3ee' },
  { name: 'Next.js', category: 'frontend', level: 88, color: '#f4f4f5' },
  { name: 'Tailwind CSS', category: 'frontend', level: 94, color: '#06b6d4' },
  { name: 'Node.js', category: 'backend', level: 90, color: '#22c55e' },
  { name: 'Express.js', category: 'backend', level: 88, color: '#a3a3a3' },
  { name: 'MongoDB', category: 'backend', level: 85, color: '#4ade80' },
  { name: 'REST APIs', category: 'backend', level: 92, color: '#818cf8' },
  { name: 'JWT Auth', category: 'ai', level: 86, color: '#f472b6' },
  { name: 'GSAP', category: 'animation', level: 88, color: '#88ce02' },
  { name: 'Framer Motion', category: 'animation', level: 90, color: '#a78bfa' },
  { name: 'Three.js', category: 'animation', level: 82, color: '#22d3ee' },
  { name: 'Docker', category: 'devops', level: 78, color: '#2496ed' },
  { name: 'GitHub', category: 'devops', level: 92, color: '#f4f4f5' },
  { name: 'Render Deployment', category: 'devops', level: 85, color: '#46e3b7' },
  { name: 'Vercel Deployment', category: 'devops', level: 88, color: '#f4f4f5' },
  { name: 'AI Integration', category: 'ai', level: 87, color: '#e879f9' },
]
