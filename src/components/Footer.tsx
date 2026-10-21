import React from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const { data } = usePortfolio()
  const { profile } = data

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-main)] py-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center font-display font-black text-xl text-[var(--accent)]">
              {profile.monogram}
            </div>
            <div>
              <span className="font-display font-bold text-lg text-[var(--text-primary)] block">
                {profile.fullName}
              </span>
              <span className="text-xs text-[var(--text-muted)] tracking-wider uppercase">
                Mercadeo, Publicidad &amp; Growth
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {profile.socials.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] hover:scale-105 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
            )}
            {profile.socials.instagram && (
              <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" title="Instagram"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] hover:scale-105 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {profile.socials.behance && (
              <a href={profile.socials.behance} target="_blank" rel="noopener noreferrer" title="Behance"
                className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent)] hover:scale-105 transition-all font-bold text-xs">
                Bē
              </a>
            )}
            <button onClick={scrollToTop} title="Volver arriba"
              className="w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all ml-2">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <p>© {new Date().getFullYear()} {profile.fullName}. Todos los derechos reservados.</p>
          <span className="text-[11px] font-mono text-[var(--text-muted)] hidden md:inline">
            Hecho con estrategia &amp; pasión
          </span>
        </div>
      </div>
    </footer>
  )
}
