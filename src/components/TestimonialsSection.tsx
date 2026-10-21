import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Quote, Star } from 'lucide-react'

export const TestimonialsSection: React.FC = () => {
  const { data } = usePortfolio()
  const { testimonials } = data

  return (
    <section className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              <span>Validación de Mercado</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[var(--text-primary)]">
              Lo Que Dicen Los Clientes
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            Directores de crecimiento, fundadores y gerentes de marca que han transformado sus resultados trabajando junto a Juliana.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between hover:border-[var(--accent)] transition-all duration-300 hover:-translate-y-1.5 group shadow-sm hover:shadow-xl hover:shadow-[var(--accent-glow)]"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[var(--accent)]/30 group-hover:text-[var(--accent)] transition-colors" />
                </div>

                {/* Metric pill if available */}
                {test.metricResult && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[11px] font-mono font-bold text-[var(--accent)] mb-4">
                    {test.metricResult}
                  </div>
                )}

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed italic mb-8 font-serif-luxury">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-[var(--border-color)]">
                <img
                  src={test.avatarUrl}
                  alt={test.author}
                  className="w-11 h-11 rounded-full object-cover border border-[var(--border-color)]"
                />
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">
                    {test.author}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)]">
                    {test.role} • <span className="text-[var(--text-secondary)]">{test.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
