import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { GraduationCap, Award, Wrench, ShieldCheck } from 'lucide-react'

export const ToolsAndEducation: React.FC = () => {
  const { data } = usePortfolio()
  const { tools, education } = data

  return (
    <section id="experiencia" className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          
          {/* Tools & Stack (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
                <Wrench className="w-3.5 h-3.5" />
                <span>Stack Estratégico &amp; Software</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--text-primary)] mb-6">
                Herramientas &amp; Ecosistema
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                Dominio avanzado de plataformas publicitarias de nivel enterprise, herramientas analíticas de atribución y software creativo para garantizar ejecuciones sin fisuras.
              </p>

              {/* Tools Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent)] transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-mono block mb-1">
                        {tool.category}
                      </span>
                      <h4 className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {tool.name}
                      </h4>
                    </div>
                    {tool.badge && (
                      <span className="mt-3 inline-block self-start text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Education & Certifications (Col 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Formación Profesional &amp; Credenciales</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--text-primary)] mb-6">
                Educación &amp; Certificaciones
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                Fundamentación académica formal en Mercadeo y Publicidad, enriquecida con certificaciones oficiales vigentes de los gigantes tecnológicos mundiales.
              </p>

              {/* Education Timeline Cards */}
              <div className="space-y-4">
                {education.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] transition-all flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center shrink-0 text-[var(--accent)] group-hover:scale-105 transition-transform">
                      {item.type === 'Educación' ? (
                        <GraduationCap className="w-6 h-6" />
                      ) : (
                        <Award className="w-6 h-6 text-amber-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono text-[var(--accent)] font-semibold uppercase">
                          {item.type}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-mono">
                          {item.period}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-0.5">
                        {item.degree}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mb-2">
                        {item.institution}
                      </p>
                      {item.credentialId && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{item.credentialId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
