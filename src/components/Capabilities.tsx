import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Sparkles, Target, Flame, MessageSquareHeart, Workflow, BarChart3, Megaphone, CheckCircle2, Compass } from 'lucide-react'

export const Capabilities: React.FC = () => {
  const { data } = usePortfolio()
  const { services, settings } = data
  const isCvMode = settings.presentationMode === 'cv'

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-400" />
      case 'Target':
        return <Target className="w-6 h-6 text-rose-400" />
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-400" />
      case 'MessageSquareHeart':
        return <MessageSquareHeart className="w-6 h-6 text-pink-400" />
      case 'Workflow':
        return <Workflow className="w-6 h-6 text-sky-400" />
      case 'BarChart3':
        return <BarChart3 className="w-6 h-6 text-emerald-400" />
      case 'Compass':
        return <Compass className="w-6 h-6 text-indigo-400" />
      default:
        return <Megaphone className="w-6 h-6 text-[var(--accent)]" />
    }
  }

  return (
    <section id="capacidades" className="py-24 md:py-32 bg-[var(--bg-surface)]/40 border-y border-[var(--border-color)] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
            <span>
              {isCvMode ? 'Competencias Clave • Mercadeo & Publicidad' : 'Áreas de Dominio • Mercadeo & Publicidad'}
            </span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[var(--text-primary)] mb-6">
            {isCvMode ? 'Competencias Estratégicas & Habilidades' : 'Capacidades Estratégicas & Soluciones'}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {isCvMode
              ? 'Conjunto de capacidades con las que lidero departamentos de marketing: desde la conceptualización de marca y pauta paga hasta el crecimiento de ingresos data-driven.'
              : 'Un enfoque holístico que cubre todo el ciclo de vida del consumidor: desde la conceptualización de marca hasta la optimización de métricas de rentabilidad.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[var(--accent-glow)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-4">
                  {service.subtitle}
                </p>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--border-color)]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">
                  {isCvMode ? 'Capacidades Concretas:' : 'Entregables Clave:'}
                </span>
                <ul className="space-y-2">
                  {service.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
