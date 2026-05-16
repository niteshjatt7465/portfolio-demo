export const SITE = {
  name: 'Nitesh Sagar',
  role: 'Full Stack Developer',
  tagline: 'AI Powered Web Experiences',
  email: 'niteshsagar58@gmail.com',
  location: 'India',
  year: new Date().getFullYear(),
} as const

export const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai', label: 'AI' },
  { id: 'experience', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
] as const
