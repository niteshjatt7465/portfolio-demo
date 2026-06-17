export interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  github?: string
  live?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'gst-calculator',
    title: 'GST Calculator & Invoice Generator',
    description:
      'A free online GST Calculator and Invoice Generator that helps users instantly calculate GST for 5%, 12%, 18%, and 28% slabs and download a professional PDF invoice — no signup required, 100% client-side.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'jsPDF'],
    github: 'https://github.com/niteshjatt7465/GST-calculator',
    live: 'https://gst-calculator-self.vercel.app/',
    featured: true,
  },
  {
    id: 'fitmitra',
    title: 'FitMitra AI',
    description:
      'AI-generated fitness plans, workout tracking, and personalized coaching powered by machine learning.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    tech: ['Next.js', 'TypeScript', 'AI APIs', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://ai-fitness-mitra.vercel.app/',
    featured: true,
  },
  {
    id: 'ai-study-planner',
    title: 'AI Study Planner',
    description:
      'Intelligent study scheduling with GPT-powered task breakdown, progress tracking, and adaptive learning paths.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
    tech: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
]
