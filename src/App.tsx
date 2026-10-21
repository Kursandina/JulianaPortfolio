import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] relative selection:bg-[var(--accent)] selection:text-white transition-colors duration-500">
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 bg-noise pointer-events-none z-30" />

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
        </Routes>
      </PortfolioProvider>
    </BrowserRouter>
  )
}
