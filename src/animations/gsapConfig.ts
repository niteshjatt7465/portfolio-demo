import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const premiumEase = 'power3.out'

export function revealOnScroll(
  selector: string,
  options?: { y?: number; stagger?: number; start?: string }
) {
  const { y = 60, stagger = 0.1, start = 'top 85%' } = options ?? {}
  gsap.from(selector, {
    y,
    opacity: 0,
    duration: 1,
    stagger,
    ease: premiumEase,
    scrollTrigger: {
      trigger: selector,
      start,
      toggleActions: 'play none none reverse',
    },
  })
}
