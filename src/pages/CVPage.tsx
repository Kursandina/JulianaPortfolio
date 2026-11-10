import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { CurriculumDocument } from '../components/CurriculumDocument'
import { exportElementToPdf, triggerPrintCv } from '../utils/exportPdf'
import {
  ArrowLeft,
  Download,
  Printer,
  Loader2,
  Check,
  FileText,
  Share2
} from 'lucide-react'

export const CVPage: React.FC = () => {
  const { data } = usePortfolio()
  const [isExporting, setIsExporting] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true)
      const element = document.getElementById('cv-fullpage-document')
      if (!element) return

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
      triggerPrintCv()
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 3000)
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-8 px-4 sm:px-6 print:p-0 print:bg-white print:text-neutral-900">
      
      {/* ─── FLOATING TOP TOOLBAR (HIDDEN ON PRINT) ─── */}
      <div className="no-print max-w-[210mm] mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-800/90 border border-neutral-700/80 shadow-2xl backdrop-blur-md sticky top-4 z-40">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portafolio</span>
        </a>

        <div className="flex items-center gap-2.5">
          {/* Copy direct link */}
          <button
            onClick={handleCopyLink}
            title="Copiar enlace directo al CV"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition-colors"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">¡Enlace Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir</span>
              </>
            )}
          </button>

          {/* Native Print button */}
          <button
            onClick={() => triggerPrintCv()}
            title="Imprimir o Guardar como PDF con diálogo del navegador"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-700 hover:border-purple-400 text-neutral-200 hover:text-white transition-colors"
          >
            <Printer className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Imprimir / Guardar</span>
          </button>

          {/* Instant PDF Download */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-purple-600 text-white hover:bg-purple-500 active:scale-95 transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50"
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
        </div>
      </div>

      {/* ─── PRINTABLE DOCUMENT ─── */}
      <main className="w-full">
        <CurriculumDocument data={data} id="cv-fullpage-document" />
      </main>

      {/* ─── INSTRUCTIONS HINT (HIDDEN ON PRINT) ─── */}
      <footer className="no-print max-w-[210mm] mx-auto mt-8 text-center text-xs text-neutral-400 font-mono">
        <p>
          💡 Tip: Si deseas texto 100% vectorial seleccionable en el PDF, presiona <strong>"Imprimir / Guardar"</strong> y en Destino elige <strong>"Guardar como PDF"</strong>.
        </p>
      </footer>
    </div>
  )
}
