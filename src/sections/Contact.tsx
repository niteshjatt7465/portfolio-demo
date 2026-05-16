import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { SectionHeading } from '@/components/SectionHeading'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MagneticButton } from '@/components/MagneticButton'
import { ContactToast } from '@/components/ContactToast'
import { SOCIAL_LINKS } from '@/constants/social'
import { SITE } from '@/constants/site'
import { useContactForm } from '@/hooks/useContactForm'
import { fadeUp } from '@/animations/variants'

export function Contact() {
  const {
    form,
    loading,
    submitted,
    toast,
    updateField,
    handleSubmit,
    resetForm,
    closeToast,
  } = useContactForm()

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32 pb-40">
      <ContactToast
        open={toast.open}
        type={toast.type}
        message={toast.message}
        onClose={closeToast}
      />

      <motion.div className="mx-auto max-w-4xl">
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
            noValidate
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success-panel"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto" />
                  </motion.div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-white">
                    Message Sent!
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400 max-w-xs">
                    Thanks for reaching out. I&apos;ll respond as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <motion.div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-1.5 block text-xs text-zinc-500">
                        Name
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={updateField('name')}
                        required
                        minLength={2}
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs text-zinc-500">
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={updateField('email')}
                        required
                        disabled={loading}
                      />
                    </div>
                  </motion.div>
                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-xs text-zinc-500">
                      Subject
                    </label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="Project inquiry"
                      value={form.subject}
                      onChange={updateField('subject')}
                      required
                      minLength={3}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-xs text-zinc-500">
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={updateField('message')}
                      required
                      minLength={10}
                      rows={5}
                      disabled={loading}
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    variant="glow"
                    className="w-full sm:w-auto min-w-[160px]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>

      <footer className="mt-20 text-center text-xs text-zinc-600">
        © {SITE.year} {SITE.name}. Crafted with React, Three.js & GSAP.
      </footer>
    </section>
  )
}
