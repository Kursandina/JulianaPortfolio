import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { Mail, MapPin, Send, MessageCircle, ArrowUpRight, Check, Sparkles, FileText, Briefcase } from 'lucide-react'
import confetti from 'canvas-confetti'

export const ContactCTA: React.FC = () => {
  const { data } = usePortfolio()
  const { profile, settings } = data
  const isCvMode = settings.presentationMode === 'cv'

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    rolePosition: 'Marketing Lead / Growth Strategist',
    contractType: 'Remoto Tiempo Completo (Full-Time)',
    budget: '$1,000 - $3,000 USD',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      })
    } catch (err) {}
  }

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Juliana,%20vi%20tu%20perfil%20profesional%20y%20me%20gustar%C3%ADa%20conversar%20sobre%20una%20oportunidad%20laboral`

  return (
    <section id="contacto" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] ambient-glow-purple pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[var(--accent)]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            
            {/* Left Side: Pitch & Direct Contact */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isCvMode ? 'Contratación Remota • Conectemos' : 'Próximo Paso • Transformemos tu Marca'}
                  </span>
                </div>

                <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight uppercase text-[var(--text-primary)] leading-[0.98] mb-6">
                  {isCvMode ? '¿Buscando Liderazgo en Mercadeo?' : 'Creemos Algo Extraordinario'}
                </h2>

                <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
                  {isCvMode
                    ? profile.availabilityStatus || 'Disponible para contratación remota a nivel internacional. Abierta a entrevistas y reuniones para explorar sinergias con tu equipo.'
                    : profile.availabilityStatus}
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-4 mb-10">
                  {/* Email row with copy */}
                  <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] flex items-center justify-between group">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] block">
                          Correo Directo
                        </span>
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-medium text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors truncate block"
                        >
                          {profile.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-all shrink-0 ml-2"
                    >
                      {copied ? (
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Check className="w-3.5 h-3.5" /> Copiado
                        </span>
                      ) : (
                        'Copiar'
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Quick Link */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400/80 block">
                          WhatsApp Profesional
                        </span>
                        <span className="font-medium text-sm text-[var(--text-primary)]">
                          {profile.phone}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>

                  {/* Location & Modality */}
                  <div className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)] flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[var(--text-muted)] block">
                        Ubicación &amp; Modalidad
                      </span>
                      <span className="font-medium text-sm text-[var(--text-primary)]">
                        {profile.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Proposal / Interview Request Form */}
            <div className="lg:col-span-6">
              <div className="p-7 sm:p-9 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface-elevated)]">
                <h3 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-2">
                  {isCvMode ? 'Conectemos para una Entrevista' : 'Cuéntame sobre tu proyecto'}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-6">
                  {isCvMode
                    ? 'Déjame los detalles de la vacante u oportunidad y responderé en menos de 24 horas.'
                    : 'Completa el formulario y responderé en menos de 24 horas con un diagnóstico preliminar.'}
                </p>

                {submitted ? (
                  <div className="py-12 text-center animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="font-display font-bold text-xl text-[var(--text-primary)] mb-2">
                      ¡Mensaje Recibido!
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
                      Muchas gracias por el contacto. Revisaré la información y me comunicaré a tu correo a la brevedad.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)]"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        {isCvMode ? 'Nombre del Reclutador / Empresa *' : 'Tu Nombre / Empresa *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder={isCvMode ? 'Ej. Carolina Herrera • TechCorp Inc.' : 'Ej. Valeria Gómez • Marca X'}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                          Email Corporativo *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="reclutamiento@empresa.com"
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                          {isCvMode ? 'Posición / Rol' : 'Tipo de Servicio'}
                        </label>
                        {isCvMode ? (
                          <select
                            value={formState.rolePosition}
                            onChange={(e) => setFormState({ ...formState, rolePosition: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                          >
                            <option value="Marketing Lead / Growth Strategist">Marketing Lead / Growth Strategist</option>
                            <option value="Especialista en Publicidad Digital & Paid Media">Especialista en Paid Media</option>
                            <option value="Dirección Creativa & Branding">Dirección Creativa &amp; Branding</option>
                            <option value="Social Media & Content Strategist">Social Media &amp; Content Strategist</option>
                            <option value="Otro Rol en Mercadeo">Otro Rol en Mercadeo</option>
                          </select>
                        ) : (
                          <select
                            value={formState.rolePosition}
                            onChange={(e) => setFormState({ ...formState, rolePosition: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                          >
                            <option value="Campaña 360 / Lanzamiento">Campaña 360 / Lanzamiento</option>
                            <option value="Paid Media & Ads (Meta/Google)">Paid Media &amp; Ads (Meta/Google)</option>
                            <option value="Estrategia de Marca & Rebranding">Estrategia de Marca &amp; Rebranding</option>
                            <option value="Growth & Funnels de Venta">Growth &amp; Funnels de Venta</option>
                          </select>
                        )}
                      </div>
                    </div>

                    {isCvMode ? (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                          Modalidad del Empleo
                        </label>
                        <select
                          value={formState.contractType}
                          onChange={(e) => setFormState({ ...formState, contractType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                        >
                          <option value="Remoto Tiempo Completo (Full-Time)">Remoto Tiempo Completo (Full-Time)</option>
                          <option value="Remoto Medio Tiempo (Part-Time)">Remoto Medio Tiempo (Part-Time)</option>
                          <option value="Contrato por Proyecto / Asesoría">Contrato por Proyecto / Asesoría</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                          Rango de Presupuesto
                        </label>
                        <select
                          value={formState.budget}
                          onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                        >
                          <option value="$1,000 - $3,000 USD">$1,000 - $3,000 USD</option>
                          <option value="$3,000 - $6,000 USD">$3,000 - $6,000 USD</option>
                          <option value="+$6,000 USD">+$6,000 USD</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5">
                        {isCvMode ? 'Detalles de la Vacante / Mensaje *' : 'Objetivo Principal *'}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder={isCvMode ? 'Describe brevemente la vacante, enlace a la oferta o propuesta de entrevista...' : 'Describe brevemente tus objetivos: escalar ventas, optimizar pauta...'}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:scale-[1.01]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isCvMode ? 'Enviar Propuesta / Agendar Entrevista' : 'Enviar Solicitud de Proyecto'}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
