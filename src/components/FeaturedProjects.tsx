import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { ArrowUpRight, Sparkles, Filter, ExternalLink } from 'lucide-react'
import { ProjectItem } from '../types/portfolio'

export const FeaturedProjects: React.FC = () => {
  const { data, setSelectedProject } = usePortfolio()
  const { projects } = data
  const [activeCategory, setActiveCategory] = useState<string>('Todos')

  const categories = ['Todos', 'Campaña 360', 'Performance & Ads', 'Branding', 'Social Media', 'Growth', 'E-commerce']

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="trabajos" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Casos Reales • Estrategia &amp; Publicidad</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase text-[var(--text-primary)]">
              Casos de Éxito &amp; Campañas
            </h2>
          </div>

          <span className="text-xs font-medium text-[var(--text-muted)]">
            {filteredProjects.length} proyectos exhibidos
          </span>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          <Filter className="w-4 h-4 text-[var(--text-muted)] mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[var(--accent)] text-white shadow-md shadow-black/20'
                  : 'bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: ProjectItem) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-[var(--border-hover)] hover:shadow-2xl hover:shadow-[var(--accent-glow)]"
            >
              {/* Image Container with Hover Zoom & Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Highlight Metric Pill */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full glass-panel border border-[var(--border-color)] text-xs font-mono font-bold text-white shadow-lg bg-black/60 backdrop-blur-md">
                  {project.highlightMetric}
                </div>

                {/* Year Pill */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-black/40 text-neutral-300 backdrop-blur-md border border-white/10">
                  {project.year}
                </div>

                {/* Hover Quick Action Indicator */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Client */}
                  <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)] mb-2">
                    <span className="text-[var(--accent)] font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="truncate max-w-[140px] text-right">
                      {project.client}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-3 leading-snug">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-6">
                    {project.summary}
                  </p>
                </div>

                {/* Channel / Skill Tags */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[var(--border-color)]">
                    {project.channels?.slice(0, 3).map((ch, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2.5 py-1 rounded-md bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] font-medium border border-[var(--border-color)]"
                      >
                        {ch}
                      </span>
                    ))}
                    {(project.channels?.length || 0) > 3 && (
                      <span className="text-[10px] px-2 py-1 rounded-md text-[var(--text-muted)] font-mono">
                        +{(project.channels?.length || 0) - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
