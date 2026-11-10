import React from 'react'
import { PortfolioData } from '../types/portfolio'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Wrench,
  CheckCircle2,
  TrendingUp,
  FolderGit2
} from 'lucide-react'

interface CurriculumDocumentProps {
  data: PortfolioData
  id?: string
}

export const CurriculumDocument: React.FC<CurriculumDocumentProps> = ({
  data,
  id = 'cv-print-document'
}) => {
  const { profile, metrics, experience, education, services, tools, projects } = data

  const cleanPhone = profile.phone.replace(/[^0-9+]/g, '')
  const websiteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://julianarincon.com'

  return (
    <div
      id={id}
      className="cv-document w-full max-w-[210mm] mx-auto bg-white text-neutral-900 font-sans shadow-2xl print:shadow-none p-8 sm:p-12 print:p-0 rounded-2xl print:rounded-none border border-neutral-200 print:border-none box-border text-[13px] leading-relaxed"
      style={{ minHeight: '297mm' }}
    >
      {/* ─── HEADER ─── */}
      <header className="border-b-2 border-neutral-900 pb-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase font-display mb-1">
              {profile.fullName}
            </h1>
            <p className="text-sm sm:text-base font-bold text-purple-700 uppercase tracking-wider">
              {profile.desiredRole || profile.headline || 'Marketing & Brand Strategist'}
            </p>
          </div>

          <div className="text-right sm:text-right text-xs text-neutral-600 font-mono">
            <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded font-semibold border border-neutral-200">
              {profile.workType || '100% Remoto (Disponibilidad Inmediata)'}
            </span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-1.5 hover:text-purple-700 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>{profile.email}</span>
          </a>

          <a
            href={`tel:${cleanPhone}`}
            className="flex items-center gap-1.5 hover:text-purple-700 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>{profile.phone}</span>
          </a>

          <div className="flex items-center gap-1.5 text-neutral-600">
            <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>{profile.location}</span>
          </div>

          {profile.socials.linkedin && (
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-neutral-800 hover:text-purple-700 transition-colors font-medium"
            >
              <svg className="w-3.5 h-3.5 fill-purple-600 shrink-0" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          )}

          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-purple-700 hover:underline font-semibold"
          >
            <Globe className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span>Portafolio Online</span>
          </a>
        </div>
      </header>

      {/* ─── RESUMEN PROFESIONAL ─── */}
      <section className="mb-6 break-inside-avoid">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-2 border-b border-neutral-200 pb-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Perfil &amp; Resumen Profesional</span>
        </h2>
        <p className="text-neutral-700 text-xs sm:text-[13px] leading-relaxed text-justify">
          {profile.fullBio || profile.shortBio}
        </p>
      </section>

      {/* ─── MÉTRICAS CLAVE / IMPACTO ─── */}
      {metrics && metrics.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
            {metrics.map((m) => (
              <div key={m.id} className="text-center">
                <span className="block text-xl font-extrabold text-purple-700 font-display">
                  {m.value}
                </span>
                <span className="block text-[11px] font-bold text-neutral-800 uppercase tracking-tight">
                  {m.label}
                </span>
                {m.sublabel && (
                  <span className="block text-[10px] text-neutral-500 truncate">
                    {m.sublabel}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── EXPERIENCIA LABORAL ─── */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2 border-b border-neutral-200 pb-1">
            <Briefcase className="w-3.5 h-3.5 text-purple-600" />
            <span>Experiencia Laboral &amp; Trayectoria</span>
          </h2>

          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div>
                    <h3 className="text-sm font-bold text-neutral-950">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-semibold text-purple-700">
                      {exp.company}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500 font-mono sm:text-right">
                    <span>{exp.period}</span> • <span>{exp.location}</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mb-2 leading-relaxed">
                  {exp.description}
                </p>

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1.5 mb-2.5">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech chips */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-200 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── GRID: EDUCACIÓN & HERRAMIENTAS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Educación & Certificaciones */}
        {education && education.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2 border-b border-neutral-200 pb-1">
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span>Educación &amp; Certificaciones</span>
            </h2>

            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs">
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="font-bold text-neutral-900">{edu.degree}</span>
                    <span className="text-[11px] text-neutral-500 font-mono shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <div className="text-neutral-600 font-medium">
                    {edu.institution}
                  </div>
                  {edu.credentialId && (
                    <div className="text-[10px] text-purple-700 font-mono">
                      {edu.credentialId}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stack de Herramientas */}
        {tools && tools.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2 border-b border-neutral-200 pb-1">
              <Wrench className="w-3.5 h-3.5 text-purple-600" />
              <span>Herramientas &amp; Software</span>
            </h2>

            <div className="flex flex-wrap gap-1.5">
              {tools.map((tool) => (
                <span
                  key={tool.id}
                  className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200 flex items-center gap-1.5 font-medium"
                >
                  <span>{tool.name}</span>
                  {tool.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-purple-100 text-purple-700 font-mono">
                      {tool.badge}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ─── COMPETENCIAS CLAVE & PILARES ─── */}
      {services && services.length > 0 && (
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2 border-b border-neutral-200 pb-1">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Competencias Estratégicas Clave</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {services.map((serv) => (
              <div key={serv.id} className="p-2.5 bg-neutral-50 rounded-lg border border-neutral-200">
                <h4 className="font-bold text-neutral-900 mb-0.5">{serv.title}</h4>
                <p className="text-[11px] text-neutral-600 mb-1">{serv.subtitle}</p>
                {serv.deliverables && serv.deliverables.length > 0 && (
                  <p className="text-[10px] text-neutral-500 italic">
                    {serv.deliverables.slice(0, 3).join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── CASOS DE ÉXITO SELECCIONADOS ─── */}
      {projects && projects.length > 0 && (
        <section className="break-inside-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 flex items-center gap-2 border-b border-neutral-200 pb-1">
            <FolderGit2 className="w-3.5 h-3.5 text-purple-600" />
            <span>Casos de Éxito &amp; Campañas Seleccionadas</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="border-l-2 border-purple-600 pl-3 py-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-neutral-900">{p.title}</h4>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    {p.highlightMetric}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-600 mt-0.5 line-clamp-2">
                  {p.summary}
                </p>
                <div className="text-[10px] text-neutral-400 font-mono mt-1">
                  {p.client} ({p.year})
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="mt-8 pt-4 border-t border-neutral-200 text-center text-[10px] text-neutral-400 font-mono flex items-center justify-between">
        <span>{profile.fullName} • Curriculum Vitae</span>
        <span>Generado desde {websiteUrl}</span>
      </footer>
    </div>
  )
}
