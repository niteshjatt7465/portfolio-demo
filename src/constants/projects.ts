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
  {
    id: 'fitmitra',
    title: 'FitMitra AI',
    description:
      'AI-generated fitness plans, workout tracking, and personalized coaching powered by machine learning.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    tech: ['Next.js', 'TypeScript', 'AI APIs', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description:
      'Conversational AI assistant with context memory, streaming responses, and custom knowledge base integration.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tech: ['React', 'Express', 'GPT API', 'WebSocket'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'Award-level cinematic portfolio with Three.js, GSAP scroll animations, and immersive 3D experiences.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tech: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'dashboard',
    title: 'Full Stack Dashboard',
    description:
      'Real-time analytics dashboard with JWT auth, REST APIs, charts, and role-based access control.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'notes-organizer',
    title: 'AI Notes Organizer',
    description:
      'Smart note-taking with AI summarization, tagging, semantic search, and cloud sync.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    tech: ['Next.js', 'AI', 'Prisma', 'Vercel'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
]
