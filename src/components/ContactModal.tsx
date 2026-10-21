import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { X, Send, Mail, MessageCircle, Check } from 'lucide-react'
import confetti from 'canvas-confetti'

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, setIsContactModalOpen, data } = usePortfolio()
  const { profile } = data

  const [form, setForm] = useState({
    name: '',
    email: '',
    service: 'Campaña 360 & Pauta',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  if (!isContactModalOpen) return null

  const cleanPhone = profile.whatsapp.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hola%20Juliana,%20quiero%20cotizar%20un%20proyecto%20de%20mercadeo`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    try {
      confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } })
    } catch (err) {}
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsContactModalOpen(false)} />

      <div className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-2xl z-10">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border-color)]">
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
              Hablemos de tu Proyecto
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Juliana Rincón • Mercadeo &amp; Publicidad
            </p>
          </div>
          <button
            onClick={() => setIsContactModalOpen(false)}
            className="p-2 rounded-full border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-lg text-[var(--text-primary)] mb-1">
              ¡Mensaje enviado con éxito!
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mb-6">
              Pronto me pondré en contacto contigo para coordinar una reunión diagnóstica.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setIsContactModalOpen(false)
              }}
              className="px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold uppercase"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Tu Nombre
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nombre o Empresa"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Área de Interés
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              >
                <option value="Campaña 360 & Pauta">Campaña 360 &amp; Pauta Digital</option>
                <option value="Estrategia de Marca & Branding">Estrategia de Marca &amp; Branding</option>
                <option value="Growth & Performance Marketing">Growth &amp; Performance Marketing</option>
                <option value="Social Media & Creación de Contenido">Social Media &amp; Creación de Contenido</option>
                <option value="Consultoría / Auditoría">Consultoría / Auditoría</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-[var(--text-secondary)] mb-1">
                Detalles del Proyecto
              </label>
              <textarea
                rows={3}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="¿En qué consiste el proyecto o qué meta deseas alcanzar?"
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Mensaje</span>
              </button>

              <div className="flex items-center justify-center gap-2 my-1 text-xs text-[var(--text-muted)]">
                <span>o contáctame por</span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Directo</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
