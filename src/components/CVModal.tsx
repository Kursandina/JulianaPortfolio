import React, { useState, useRef, useEffect } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { CurriculumDocument } from './CurriculumDocument'
import { exportElementToPdf, triggerPrintCv } from '../utils/exportPdf'
import {
  X,
  Download,
  Printer,
  Check,
  Loader2,
  FileText,
  Sparkles
} from 'lucide-react'

export const CVModal: React.FC = () => {
  const { data, isCvModalOpen, setIsCvModalOpen } = usePortfolio()
  const [isExporting, setIsExporting] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const cvDocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCvModalOpen(false)
      }
    }
    if (isCvModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isCvModalOpen, setIsCvModalOpen])

  if (!isCvModalOpen) return null

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true)
      const element = document.getElementById('cv-modal-document')
      if (!element) {
        throw new Error('Element not found')
      }

      const safeName = data.profile.fullName
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '')
      const filename = `Curriculum_${safeName}_Marketing.pdf`

      await exportElementToPdf(element, { filename, scale: 2.5 })
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 4000)
    } catch (err) {
      console.error('Error generating PDF:', err)
      // Fallback to native print if canvas fails
      triggerPrintCv()
    } finally {
      setIsExporting(false)
    }
  }

  const handleNativePrint = () => {
    // If user wants native browser print dialog (e.g. Save as PDF with selectable vector text)
    triggerPrintCv()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCvModalOpen(false)}
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-5xl h-[94vh] bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[var(--bg-surface-elevated)] border-b border-[var(--border-color)] gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)]">
                Curriculum Vitae Profesional
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                {data.profile.fullName} • Listo para descargar en PDF
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Direct PDF Download button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600 text-white hover:bg-purple-500 active:scale-95 transition-all shadow-md shadow-purple-600/30 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generando PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>¡Descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </>
              )}
            </button>

            {/* Native Print / Save to PDF */}
            <button
              onClick={handleNativePrint}
              title="Abrir diálogo de impresión / Guardar como PDF vectorial"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all"
            >
              <Printer className="w-4 h-4 text-[var(--accent)]" />
              <span>Imprimir</span>
            </button>

            {/* Close button */}
            <button
              onClick={() => setIsCvModalOpen(false)}
              className="w-9 h-9 rounded-full border border-[var(--border-color)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tip Banner */}
        <div className="bg-purple-950/40 border-b border-purple-500/20 px-6 py-2 flex items-center justify-between text-xs text-purple-200 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>
              Documento estructurado y optimizado con todas tus métricas, experiencia y certificaciones de Mercadeo.
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-[11px] text-purple-300">
            Formato A4 • ATS-Friendly
          </span>
        </div>

        {/* Scrollable Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-neutral-900/60 flex justify-center">
          <div ref={cvDocRef} className="w-full">
            <CurriculumDocument data={data} id="cv-modal-document" />
          </div>
        </div>

      </div>
    </div>
  )
}
