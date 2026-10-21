import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { ArrowUpRight, Menu, X, FileText, Briefcase } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { data, setIsContactModalOpen } = usePortfolio()
  const { profile, settings } = data
  const isCvMode = settings.presentationMode === 'cv'
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[var(--bg-main)]/85 backdrop-blur-md border-b border-[var(--border-color)] shadow-lg shadow-black/10'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Monogram Logo */}
        <a href="#hero" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[var(--border-color)] group-hover:border-[var(--accent)] flex items-center justify-center font-display font-bold text-lg tracking-wider transition-all duration-300 group-hover:scale-105 bg-[var(--bg-surface)]">
            {profile.monogram || 'JR'}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-widest uppercase text-[var(--text-primary)]">
              {profile.fullName}
            </span>
            <span className="text-[10px] tracking-wider text-[var(--text-muted)] uppercase">
              {isCvMode ? 'CV & Portafolio Remoto' : 'Mercadeo & Publicidad'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {isCvMode ? (
            <>
              <a href="#experiencia-laboral" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Experiencia
              </a>
              <a href="#trabajos" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Campañas &amp; Casos
              </a>
              <a href="#capacidades" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Competencias
              </a>
              <a href="#experiencia" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Educación &amp; Stack
              </a>
              <a href="#contacto" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Contacto
              </a>
            </>
          ) : (
            <>
              <a href="#trabajos" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Casos de Éxito
              </a>
              <a href="#capacidades" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Servicios
              </a>
              <a href="#experiencia-laboral" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Trayectoria
              </a>
              <a href="#metodologia" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Proceso
              </a>
              <a href="#contacto" className="text-xs uppercase tracking-widest font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Contacto
              </a>
            </>
          )}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-3">
          {profile.resumeUrl && profile.resumeUrl !== '#' && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Ver CV (PDF)</span>
            </a>
          )}

          <button
            onClick={() => setIsContactModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-md shadow-black/20"
          >
            <span>{isCvMode ? 'Agendar Entrevista' : 'Hablemos'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-6 bg-[var(--bg-main)] border-b border-[var(--border-color)]">
          <div className="flex flex-col gap-4">
            {isCvMode ? (
              <>
                <a href="#experiencia-laboral" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Experiencia Laboral
                </a>
                <a href="#trabajos" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Campañas &amp; Casos
                </a>
                <a href="#capacidades" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Competencias Clave
                </a>
                <a href="#experiencia" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Educación &amp; Stack
                </a>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Contacto
                </a>
              </>
            ) : (
              <>
                <a href="#trabajos" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Casos de Éxito
                </a>
                <a href="#capacidades" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Servicios &amp; Capacidades
                </a>
                <a href="#experiencia-laboral" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Trayectoria
                </a>
                <a href="#contacto" onClick={() => setMobileMenuOpen(false)} className="text-sm uppercase tracking-wider font-medium text-[var(--text-secondary)] py-2 border-b border-[var(--border-color)]">
                  Contacto
                </a>
              </>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                setIsContactModalOpen(true)
              }}
              className="mt-3 w-full py-3 rounded-full text-center text-xs font-semibold uppercase tracking-wider bg-[var(--accent)] text-white flex items-center justify-center gap-2"
            >
              <span>{isCvMode ? 'Agendar Entrevista / Conversación' : 'Iniciar Conversación'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
