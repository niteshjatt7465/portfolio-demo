import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

interface AppState {
  isLoading: boolean
  setLoading: (v: boolean) => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (v: boolean) => void
  activeSection: string
  setActiveSection: (id: string) => void
  selectedProject: string | null
  setSelectedProject: (id: string | null) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setLoading,
        commandPaletteOpen,
        setCommandPaletteOpen,
        activeSection,
        setActiveSection,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export function useScrollToSection() {
  return useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
}
