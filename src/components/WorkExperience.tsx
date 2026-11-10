import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Briefcase, MapPin, Calendar, CheckCircle2, Building2, Award, Sparkles } from 'lucide-react'

export const WorkExperience: React.FC = () => {
  const { data } = usePortfolio()
  const { experience, settings } = data
  const isCvMode = settings.presentationMode === 'cv'

  // Filter out empty items in automatic
  const validExperience = (experience || []).filter(
    (item) => item && (item.role?.trim() || item.company?.trim())
  )

  if (validExperience.length === 0) return null

  return (
    <section id="experiencia-laboral" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 ambient-glow-purple pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>
                {isCvMode ? 'Trayectoria Laboral & Logros' : 'Experiencia en Marcas & Agencias'}
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[var(--text-primary)]">
              Experiencia Laboral
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
            {isCvMode
              ? 'Historial profesional estructurado con métricas de rendimiento, liderazgo de equipos y gestión de presupuestos en esquemas remotos.'
              : 'Trayectoria coordinando cuentas comerciales y campañas de alto impacto.'}
          </p>
        </div>

        {/* Enhanced Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 items-stretch">
          {validExperience.map((item, idx) => {
            const isCurrent =
              item.period &&
              (item.period.toLowerCase().includes('presente') ||
                item.period.toLowerCase().includes('actual'))

            // Filter out empty achievements and tech strings
            const validAchievements = (item.achievements || []).filter(
              (ach) => ach && ach.trim().length > 0
            )
            const validTechnologies = (item.technologies || []).filter(
              (tech) => tech && tech.trim().length > 0
            )

            return (
              <div
                key={item.id || `exp-${idx}`}
                className="group flex flex-col h-full"
              >
                <div
                  className={`p-7 sm:p-9 rounded-3xl border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--accent-glow)] flex flex-col justify-between h-full relative overflow-hidden bg-[var(--bg-surface)] backdrop-blur-sm ${
                    isCurrent
                      ? 'border-[var(--accent)]/50 ring-1 ring-[var(--accent)]/30'
                      : 'border-[var(--border-color)] hover:border-[var(--accent)]'
                  }`}
                >
                  {/* Subtle top corner gradient */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[var(--accent)]/10 to-transparent rounded-bl-full pointer-events-none transition-opacity group-hover:from-[var(--accent)]/20" />

                  {/* Background Number Watermark */}
                  <div className="absolute -top-3 -right-2 font-display font-black text-8xl text-[var(--border-color)]/25 pointer-events-none select-none group-hover:text-[var(--accent)]/15 transition-colors">
                    0{idx + 1}
                  </div>

                  {/* Header badges */}
                  <div className="relative z-10 mb-5">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                      {isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Rol Actual / En Curso
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono font-bold text-[var(--accent)] px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30">
                          Etapa 0{idx + 1}
                        </span>
                      )}

                      {item.period && item.period.trim() && (
                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period.trim()}</span>
                        </div>
                      )}
                    </div>

                    {/* Role Title */}
                    {item.role && item.role.trim() && (
                      <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2 leading-snug">
                        {item.role.trim()}
                      </h3>
                    )}

                    {/* Company & Modality */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-[var(--text-secondary)] font-semibold">
                      {item.company && item.company.trim() && (
                        <div className="flex items-center gap-1.5 text-[var(--text-primary)]">
                          <Building2 className="w-4 h-4 text-[var(--accent)]" />
                          <span>{item.company.trim()}</span>
                        </div>
                      )}
                      {item.location && item.location.trim() && (
                        <>
                          <span className="text-[var(--border-color)]">•</span>
                          <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
                            <MapPin className="w-3 h-3" />
                            <span>{item.location.trim()}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description (hidden if empty) */}
                  {item.description && item.description.trim() && (
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6 font-normal relative z-10">
                      {item.description.trim()}
                    </p>
                  )}

                  {/* Achievements List (hidden if empty) */}
                  {validAchievements.length > 0 && (
                    <div className="pt-5 border-t border-[var(--border-color)] relative z-10 mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[var(--accent)]" />
                        <span>Logros &amp; Métricas Clave:</span>
                      </span>
                      <ul className="space-y-2">
                        {validAchievements.map((ach, aIdx) => (
                          <li
                            key={aIdx}
                            className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{ach.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack tags (hidden if empty) */}
                  {validTechnologies.length > 0 && (
                    <div className="pt-4 border-t border-[var(--border-color)] relative z-10 mt-auto">
                      <div className="flex flex-wrap gap-1.5">
                        {validTechnologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] font-mono font-medium hover:border-[var(--accent)] transition-colors"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
