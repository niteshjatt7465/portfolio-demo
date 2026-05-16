import { Code2, Link, Mail, MessageCircle } from 'lucide-react'

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    href: 'https://github.com/niteshjatt7465',
    icon: Code2,
    color: 'hover:text-cyan-400',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nitesh-sagar-7430a03b1',
    icon: Link,
    color: 'hover:text-violet-400',
  },
  {
    name: 'Email',
    href: 'mailto:niteshsagar58@gmail.com',
    icon: Mail,
    color: 'hover:text-fuchsia-400',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/919058073107',
    icon: MessageCircle,
    color: 'hover:text-emerald-400',
  },
] as const
