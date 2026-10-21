import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { ArrowUpRight, Download, Sparkles, TrendingUp, CheckCircle2, Globe, FileText } from 'lucide-react'

export const Hero: React.FC = () => {
  const { data, setIsContactModalOpen } = usePortfolio()
  const { profile, settings } = data
  const isCvMode = settings.presentationMode === 'cv'

  // Interactive mouse tilt for portrait
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 ambient-glow-purple pointer-events-none rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 ambient-glow-rose pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Strategic Pitch & Headlines */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)]/60 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[var(--text-secondary)]">
                {profile.badgeText || (isCvMode ? 'DISPONIBLE PARA CONTRATACIÓN REMOTA ↗' : 'DISPONIBLE PARA PROYECTOS ↗')}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            </div>

            {/* Target Role Pill (CV Mode) */}
            {isCvMode && profile.desiredRole && (
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent)] mb-3">
                <Globe className="w-3.5 h-3.5" />
                <span>Rol Objetivo: {profile.desiredRole}</span>
              </div>
            )}

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl xl:text-8xl tracking-tight leading-[0.95] uppercase mb-8 text-[var(--text-primary)]">
              {profile.headline.split('&').map((part, index) => (
                <span key={index} className="block">
                  {index > 0 ? (
                    <span className="text-[var(--accent)] italic font-serif-luxury font-normal mr-2">
                      &amp;
                    </span>
                  ) : null}
                  {part.trim()}
                </span>
              ))}
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-[var(--text-secondary)] font-normal max-w-xl leading-relaxed mb-10">
              {profile.shortBio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {isCvMode ? (
                <>
                  <a
                    href="#experiencia-laboral"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-95 transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20"
                  >
                    <span>Ver Trayectoria &amp; Logros</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  {profile.resumeUrl && profile.resumeUrl !== '#' ? (
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all duration-300"
                    >
                      <Download className="w-4 h-4" />
                      <span>Descargar CV (PDF)</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setIsContactModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all duration-300"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Solicitar CV Completo</span>
                    </button>
                  )}

                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs font-semibold tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{profile.workType || '100% Remoto • Full-Time'}</span>
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="#trabajos"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-95 transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20"
                  >
                    <span>Ver Casos de Éxito</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all duration-300"
                  >
                    <span>Iniciar Conversación</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Hero Portrait with 3D Parallax & Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div
              className="relative w-full max-w-md perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[var(--accent)] to-rose-500 opacity-20 blur-2xl -z-10 group-hover:opacity-40 transition-opacity duration-700" />

              <div className="absolute -top-4 -right-4 z-20 text-[var(--accent)] animate-bounce duration-1000">
                ✦
              </div>
              <div className="absolute top-1/2 -left-6 z-20 text-rose-400">
                ✧
              </div>

              {/* 3D Tilt Card Frame */}
              <div
                className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-neutral-900">
                  <img
                    src={profile.portraitUrl}
                    alt={profile.fullName}
                    className="w-full h-full object-cover object-center filter grayscale-[10%] contrast-105 hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/90 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel border border-[var(--border-color)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                        {profile.photoBadgeBottomTitle || (isCvMode ? 'Impacto & Performance' : 'Estrategia & ROAS')}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        {profile.photoBadgeBottomSubtitle || '+4.8x Retorno Promedio Logrado'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[var(--accent)] font-semibold shrink-0 ml-2">
                    {profile.photoBadgeBottomTag || 'Data-Driven'}
                  </span>
                </div>
              </div>

              {/* Top Floating Badge */}
              <div className="absolute -top-3 -left-3 px-4 py-2 rounded-full glass-panel border border-[var(--border-color)] text-[11px] font-semibold text-[var(--text-primary)] shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {profile.photoBadgeTop || (isCvMode ? 'Abierta a Contratación Remota' : 'Juliana Rincón • Mkt Leader')}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
