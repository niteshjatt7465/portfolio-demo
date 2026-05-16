import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MagneticButton } from '@/components/MagneticButton'
import { SOCIAL_LINKS } from '@/constants/social'
import { SITE } from '@/constants/site'
import { fadeUp } from '@/animations/variants'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32 pb-40">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Contact"
          title="Let's Build Something"
          subtitle="Have a project in mind? Let's create something extraordinary together."
        />

        <motion.div
          className="grid gap-12 lg:grid-cols-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="lg:col-span-2 space-y-6">
            <p className="text-zinc-400 text-sm leading-relaxed">
              Reach out for collaborations, freelance work, or just to say hello.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="block font-display text-xl text-white hover:text-cyan-400 transition-colors"
            >
              {SITE.email}
            </a>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass flex items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-400 transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="h-4 w-4" />
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-strong rounded-2xl p-6 md:p-8 space-y-4 neon-border"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-zinc-500">Name</label>
                <Input placeholder="Your name" required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-zinc-500">Email</label>
                <Input type="email" placeholder="you@email.com" required />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-zinc-500">Subject</label>
              <Input placeholder="Project inquiry" required />
            </div>
            <motion.div>
              <label className="mb-1.5 block text-xs text-zinc-500">Message</label>
              <Textarea placeholder="Tell me about your project..." required rows={5} />
            </motion.div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-400 py-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Message sent! I&apos;ll get back to you soon.
                  </span>
                </motion.div>
              ) : (
                <MagneticButton
                  key="submit"
                  type="submit"
                  variant="glow"
                  className="w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </MagneticButton>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>

      <footer className="mt-20 text-center text-xs text-zinc-600">
        © {SITE.year} {SITE.name}. Crafted with React, Three.js & GSAP.
      </footer>
    </section>
  )
}
