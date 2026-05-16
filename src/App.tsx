import { lazy, Suspense } from 'react'
import { AppProvider } from '@/store/appStore'
import { useLenis } from '@/hooks/useLenis'
import { PageLoader } from '@/components/PageLoader'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { BackgroundEffects } from '@/components/BackgroundEffects'
import { Navbar } from '@/components/Navbar'
import { CommandPalette } from '@/components/CommandPalette'
import { Clock } from '@/components/Clock'
import { SocialDock } from '@/components/SocialDock'
import { ProjectModal } from '@/components/ProjectModal'
import { AIAssistant } from '@/components/AIAssistant'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Skills } from '@/sections/Skills'
import { Projects } from '@/sections/Projects'
import { AI } from '@/sections/AI'
import { Experience } from '@/sections/Experience'
import { Contact } from '@/sections/Contact'

const StarfieldCanvas = lazy(() =>
  import('@/components/three/StarfieldCanvas').then((m) => ({
    default: m.StarfieldCanvas,
  }))
)

function AppContent() {
  useLenis()

  return (
    <div className="noise custom-cursor relative min-h-screen">
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <BackgroundEffects />
      <Suspense fallback={null}>
        <StarfieldCanvas />
      </Suspense>
      <Clock />
      <SocialDock />
      <Navbar />
      <CommandPalette />
      <ProjectModal />
      <AIAssistant />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <AI />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
