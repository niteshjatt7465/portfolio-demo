export interface TimelineItem {
  year: string
  title: string
  description: string
  tags: string[]
}

export const TIMELINE: TimelineItem[] = [
  {
    year: '2022',
    title: 'Learning Foundations',
    description:
      'Mastered HTML, CSS, JavaScript fundamentals and built responsive landing pages with modern layouts.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    year: '2023',
    title: 'Full Stack Development',
    description:
      'Dived into React, Node.js, MongoDB, and REST APIs. Built full-stack applications with authentication.',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    year: '2024',
    title: 'AI Projects Journey',
    description:
      'Integrated GPT APIs, built AI chatbots, study planners, and fitness apps with intelligent automation.',
    tags: ['OpenAI', 'AI', 'Next.js'],
  },
  {
    year: '2024',
    title: 'Deployment & DevOps',
    description:
      'Deployed production apps on Vercel and Render. Learned Docker, CI/CD, and cloud infrastructure basics.',
    tags: ['Vercel', 'Render', 'Docker'],
  },
  {
    year: '2025',
    title: 'Open Source & 3D Web',
    description:
      'Exploring Three.js, GSAP, and immersive web experiences. Contributing to open source and creative coding.',
    tags: ['Three.js', 'GSAP', 'Open Source'],
  },
]

export const STATS = [
  { label: 'Projects Completed', value: 24, suffix: '+' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'GitHub Contributions', value: 500, suffix: '+' },
  { label: 'Freelance Experience', value: 2, suffix: ' yrs' },
] as const
