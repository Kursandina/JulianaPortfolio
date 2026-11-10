import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { MetricsGrid } from './components/MetricsGrid'
import { WorkExperience } from './components/WorkExperience'
import { FeaturedProjects } from './components/FeaturedProjects'
import { Capabilities } from './components/Capabilities'
import { ToolsAndEducation } from './components/ToolsAndEducation'
import { ProcessSection } from './components/ProcessSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ContactCTA } from './components/ContactCTA'
import { Footer } from './components/Footer'
import { ProjectModal } from './components/ProjectModal'
import { ContactModal } from './components/ContactModal'
import { AdminPage } from './pages/AdminPage'

function PortfolioPublic() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && (e.key === 'a' || e.key === 'A')) || (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A'))) {
        e.preventDefault()
        navigate('/admin')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] relative selection:bg-[var(--accent)] selection:text-white transition-colors duration-500">
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-30 no-print" />

      {/* Main Navigation */}
      <Navbar />

      {/* Content Sections */}
      <main>
        <Hero />
        <MetricsGrid />
        <WorkExperience />
        <FeaturedProjects />
        <Capabilities />
        <ToolsAndEducation />
        <ProcessSection />
        <TestimonialsSection />
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Public Modals */}
      <ProjectModal />
      <ContactModal />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PortfolioProvider>
        <Routes>
          <Route path="/" element={<PortfolioPublic />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cv" element={<Navigate to="/admin" replace />} />
        </Routes>
      </PortfolioProvider>
    </BrowserRouter>
  )
}
