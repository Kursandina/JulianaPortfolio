import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Award, Target, TrendingUp, Users } from 'lucide-react'

export const MetricsGrid: React.FC = () => {
  const { data } = usePortfolio()
  const { metrics } = data

  const icons = [
    <Award className="w-5 h-5 text-[var(--accent)]" />,
    <Target className="w-5 h-5 text-rose-500" />,
    <TrendingUp className="w-5 h-5 text-emerald-400" />,
    <Users className="w-5 h-5 text-amber-400" />
  ]

  return (
    <section className="py-12 border-y border-[var(--border-color)] bg-[var(--bg-surface)]/30 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, idx) => (
            <div
              key={metric.id}
              className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]/70 hover:border-[var(--accent)] transition-all duration-300 group hover:-translate-y-1 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]">
                  {icons[idx % icons.length]}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                  MÉTRICA 0{idx + 1}
                </span>
              </div>
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--text-primary)] tracking-tight mb-2 group-hover:text-[var(--accent)] transition-colors">
                {metric.value}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1">
                {metric.label}
              </h3>
              {metric.sublabel && (
                <p className="text-xs text-[var(--text-secondary)]">
                  {metric.sublabel}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
