import html2pdf from 'html2pdf.js'

export interface PdfExportOptions {
  filename?: string
  marginMm?: number
  scale?: number
}

/**
 * Exports a DOM element as a downloadable PDF file using html2pdf.js
 */
export const exportElementToPdf = async (
  element: HTMLElement,
  options?: PdfExportOptions
): Promise<void> => {
  const filename = options?.filename || 'Curriculum_Juliana_Rincon_Marketing.pdf'
  const marginMm = options?.marginMm ?? 8
  const scale = options?.scale ?? 2

  const opt = {
    margin: [marginMm, marginMm, marginMm, marginMm] as [number, number, number, number],
    filename: filename,
    image: {
      type: 'jpeg' as const,
      quality: 0.98
    },
    html2canvas: {
      scale: scale,
      useCORS: true,
      logging: false,
      letterRendering: true,
      backgroundColor: '#ffffff'
    },
    jsPDF: {
      unit: 'mm' as const,
      format: 'a4',
      orientation: 'portrait' as const
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy']
    }
  }

  // Generate and trigger download
  await html2pdf().set(opt).from(element).save()
}

/**
 * Triggers standard browser print-to-PDF with native vector text
 */
export const triggerPrintCv = (): void => {
  window.print()
}
