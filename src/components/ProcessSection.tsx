import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Compass, Lightbulb, PenTool, Rocket, LineChart } from 'lucide-react'

export const ProcessSection: React.FC = () => {
  const { data } = usePortfolio()
  const { process } = data

  const stepIcons = [
    <Compass className="w-5 h-5" />,
    <Lightbulb className="w-5 h-5" />,
    <PenTool className="w-5 h-5" />,
    <Rocket className="w-5 h-5" />,
    <LineChart className="w-5 h-5" />
  ]

  return (
    <section id="metodologia" className="py-24 md:py-32 bg-[var(--bg-surface)]/30 border-y border-[var(--border-color)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
            <span>Metodología Comprobada</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[var(--text-primary)] mb-6">
            Mi Proceso de Marketing &amp; Escala
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Un marco de trabajo riguroso diseñado para eliminar la improvisación y transformar presupuestos de marketing en motores predecibles de crecimiento y ventas.
          </p>
        </div>

        {/* 5-Step Grid / Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {process.map((step, idx) => (
            <div
              key={step.id}
              className="relative p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between group hover:border-[var(--accent)] hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--accent-glow)]"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--accent)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {stepIcons[idx % stepIcons.length]}
                  </div>
                  <span className="font-display font-extrabold text-3xl text-[var(--text-muted)]/40 group-hover:text-[var(--accent)] transition-colors">
                    {step.step}
                  </span>
                </div>

                {/* Subtitle / Tagline */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)] block mb-1">
                  {step.tagline}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Fase 0{idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-[var(--border-color)] group-hover:bg-[var(--accent)] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
