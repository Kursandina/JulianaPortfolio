import React, { useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { X, ExternalLink, TrendingUp, CheckCircle, Target, Sparkles } from 'lucide-react'

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolio()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null)
      }
    }
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedProject, setSelectedProject])

  if (!selectedProject) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop click area */}
      <div
        className="absolute inset-0"
        onClick={() => setSelectedProject(null)}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl overflow-y-auto shadow-2xl z-10 scrollbar-none flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[var(--bg-surface)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase text-[var(--accent)] px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30">
              {selectedProject.category}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {selectedProject.year} • {selectedProject.client}
            </span>
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="w-9 h-9 rounded-full border border-[var(--border-color)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-neutral-900 overflow-hidden">
          <img
            src={selectedProject.coverImage}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
                {selectedProject.client}
              </p>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                {selectedProject.title}
              </h2>
            </div>
            <div className="px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-emerald-400 font-mono font-bold text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>{selectedProject.highlightMetric}</span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">
              Resumen Ejecutivo
            </h4>
            <p className="text-base sm:text-lg text-[var(--text-primary)] leading-relaxed font-normal">
              {selectedProject.summary}
            </p>
          </div>

          {/* Grid: Challenge & Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedProject.challenge && (
              <div className="p-6 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <Target className="w-4 h-4" />
                  <span>El Desafío / Problema</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {selectedProject.challenge}
                </p>
              </div>
            )}

            {selectedProject.strategy && (
              <div className="p-6 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]">
                <div className="flex items-center gap-2 text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4" />
                  <span>La Solución Estratégica</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {selectedProject.strategy}
                </p>
              </div>
            )}
          </div>

          {/* Results Block */}
          {selectedProject.results && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle className="w-4 h-4" />
                <span>Resultados Obtenidos &amp; Métricas Clave</span>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium leading-relaxed">
                {selectedProject.results}
              </p>
            </div>
          )}

          {/* Channels & Deliverables */}
          {selectedProject.channels && selectedProject.channels.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">
                Canales &amp; Disciplinas Aplicadas
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.channels.map((ch, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-color)]"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External Action Button */}
          {selectedProject.externalUrl && (
            <div className="pt-4 flex justify-end">
              <a
                href={selectedProject.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-90 transition-all"
              >
                <span>Ver Presentación Externa</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
