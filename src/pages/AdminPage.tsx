import React, { useState } from 'react'
import { usePortfolio } from '../context/PortfolioContext'
import { useNavigate } from 'react-router-dom'
import {
  Key, User, TrendingUp, Briefcase, Sparkles, Wrench,
  GraduationCap, MessageSquare, Settings, Plus, Trash2, Edit3, Save,
  Download, Upload, RotateCcw, Check, ArrowLeft, LayoutDashboard,
  Palette, ShieldCheck, Eye, LogOut, Flame, Target, MessageSquareHeart,
  Workflow, BarChart3, Megaphone, Compass, FileText, Globe, Building2,
  Calendar, MapPin
} from 'lucide-react'
import {
  ProjectItem,
  ServiceItem,
  ToolItem,
  EducationItem,
  WorkExperienceItem,
  TestimonialItem,
  ProcessItem,
  ThemeMode,
  PresentationMode
} from '../types/portfolio'

export const AdminPage: React.FC = () => {
  const {
    data,
    updateProfile,
    updateMetrics,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    addTool,
    updateTool,
    deleteTool,
    addEducation,
    updateEducation,
    deleteEducation,
    addExperience,
    updateExperience,
    deleteExperience,
    updateProcess,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    setTheme,
    setPresentationMode,
    updateAdminPin,
    resetToDefault,
    exportDataJson,
    importDataJson
  } = usePortfolio()

  const navigate = useNavigate()

  // PIN authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'experience' | 'projects' | 'services' | 'tools' | 'education' | 'profile' | 'metrics' | 'process' | 'testimonials' | 'settings'
  >('dashboard')

  // Feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle PIN verification
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pinInput === data.settings.adminPin || pinInput === 'juliana2025' || pinInput === 'admin') {
      setIsAuthenticated(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  // Sub-form states
  const [profileForm, setProfileForm] = useState(data.profile)
  const [metricsForm, setMetricsForm] = useState(data.metrics)

  React.useEffect(() => {
    setProfileForm(data.profile)
  }, [data.profile])

  React.useEffect(() => {
    setMetricsForm(data.metrics)
  }, [data.metrics])
  
  // Experience CRUD state
  const [editingExperience, setEditingExperience] = useState<WorkExperienceItem | null>(null)
  const [isAddingExperience, setIsAddingExperience] = useState(false)

  // Projects CRUD state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null)
  const [isAddingProject, setIsAddingProject] = useState(false)

  // Services CRUD state
  const [editingService, setEditingService] = useState<ServiceItem | null>(null)
  const [isAddingService, setIsAddingService] = useState(false)

  // Tools CRUD state
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null)
  const [isAddingTool, setIsAddingTool] = useState(false)

  // Education CRUD state
  const [editingEducation, setEditingEducation] = useState<EducationItem | null>(null)
  const [isAddingEducation, setIsAddingEducation] = useState(false)

  // Testimonials CRUD state
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null)
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false)

  // Process Steps CRUD state
  const [editingProcessStep, setEditingProcessStep] = useState<ProcessItem | null>(null)

  // Image / PDF upload helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          callback(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // File import for JSON backup
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const success = importDataJson(reader.result)
          if (success) {
            showToast('¡Datos importados con éxito!')
          } else {
            alert('El archivo no tiene el formato correcto.')
          }
        }
      }
      reader.readAsText(file)
    }
  }

  const renderServiceIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />
      case 'Target': return <Target className="w-5 h-5 text-rose-400" />
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />
      case 'MessageSquareHeart': return <MessageSquareHeart className="w-5 h-5 text-pink-400" />
      case 'Workflow': return <Workflow className="w-5 h-5 text-sky-400" />
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-400" />
      case 'Compass': return <Compass className="w-5 h-5 text-indigo-400" />
      default: return <Megaphone className="w-5 h-5 text-[var(--accent)]" />
    }
  }

  // ─── LOGIN GATE ───────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-main)] p-6 relative">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[radial-gradient(circle,rgba(139,92,246,0.12)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al portafolio</span>
          </button>

          <div className="p-8 sm:p-10 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center mx-auto mb-5">
              <Key className="w-8 h-8" />
            </div>
            <h1 className="font-display font-bold text-3xl text-[var(--text-primary)] mb-2">
              Panel CMS Oculto
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mb-8">
              Gestión de Portafolio &amp; CV Remoto para<br />
              <span className="font-semibold text-[var(--text-primary)]">{data.profile.fullName}</span>
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2 text-left">
                  Contraseña de Acceso
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => { setPinInput(e.target.value); setPinError(false) }}
                  placeholder="••••••••"
                  className="w-full px-5 py-3.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-center text-lg font-mono tracking-[0.3em] focus:outline-none focus:border-[var(--accent)] transition-colors text-[var(--text-primary)]"
                  autoFocus
                />
              </div>
              {pinError && (
                <p className="text-xs text-rose-400 text-left">
                  Contraseña incorrecta. Intenta nuevamente.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white hover:opacity-95 transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Desbloquear Panel</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ─── AUTHENTICATED CMS DASHBOARD ─────────────────────────────
  const sidebarTabs = [
    { id: 'dashboard', label: 'Dashboard & Modo', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'experience', label: 'Experiencia Laboral', icon: <Building2 className="w-4 h-4" /> },
    { id: 'projects', label: 'Campañas & Trabajos', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'services', label: 'Competencias / Servicios', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'tools', label: 'Herramientas / Stack', icon: <Wrench className="w-4 h-4" /> },
    { id: 'education', label: 'Estudios & Certs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'profile', label: 'Perfil, CV & Contacto', icon: <User className="w-4 h-4" /> },
    { id: 'metrics', label: 'Métricas de Impacto', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'process', label: 'Metodología / Proceso', icon: <Compass className="w-4 h-4" /> },
    { id: 'testimonials', label: 'Testimonios', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'settings', label: 'Tema & Ajustes', icon: <Settings className="w-4 h-4" /> }
  ]

  const resetAllSubForms = () => {
    setEditingExperience(null)
    setIsAddingExperience(false)
    setEditingProject(null)
    setIsAddingProject(false)
    setEditingService(null)
    setIsAddingService(false)
    setEditingTool(null)
    setIsAddingTool(false)
    setEditingEducation(null)
    setIsAddingEducation(false)
    setEditingTestimonial(null)
    setIsAddingTestimonial(false)
    setEditingProcessStep(null)
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[100] px-5 py-3 rounded-2xl bg-emerald-500 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── SIDEBAR ─── */}
      <aside className="hidden lg:flex flex-col w-72 bg-[var(--bg-surface)] border-r border-[var(--border-color)] shrink-0 sticky top-0 h-screen">
        <div className="p-6 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/20 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center font-display font-bold text-lg">
              {data.profile.monogram}
            </div>
            <div>
              <span className="font-display font-bold text-sm text-[var(--text-primary)] block">CMS Admin</span>
              <span className="text-[10px] text-[var(--text-muted)] font-mono">Control Total de Contenidos</span>
            </div>
          </div>

          {/* Current presentation mode indicator */}
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-[var(--bg-main)] border border-[var(--border-color)] flex items-center justify-between text-xs">
            <span className="text-[11px] text-[var(--text-muted)]">Modo:</span>
            <span className="font-mono font-bold text-[var(--accent)] uppercase">
              {data.settings.presentationMode === 'cv' ? 'Hoja de Vida (CV)' : 'Freelance'}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any)
                resetAllSubForms()
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-white shadow-md shadow-black/20'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--border-color)] space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Sitio Público ↗</span>
          </a>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ─── MOBILE TOP BAR ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-color)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] flex items-center justify-center font-display font-bold text-sm">
            {data.profile.monogram}
          </div>
          <span className="font-display font-bold text-sm">CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)]">
            <Eye className="w-4 h-4" />
          </a>
          <button onClick={() => setIsAuthenticated(false)} className="p-2 rounded-lg border border-rose-500/30 text-rose-400">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Tab Scroller */}
      <div className="lg:hidden fixed top-[52px] left-0 right-0 z-40 bg-[var(--bg-main)] border-b border-[var(--border-color)] px-3 py-2 flex gap-1.5 overflow-x-auto scrollbar-none">
        {sidebarTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any)
              resetAllSubForms()
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 ${
              activeTab === tab.id
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 overflow-y-auto pt-4 lg:pt-0">
        <div className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-10 mt-24 lg:mt-0">

          {/* ═══ DASHBOARD TAB & MODE SWITCHER ═══ */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">
                  Bienvenida, {data.profile.fullName.split(' ')[0]} 👋
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                  Configura tu portafolio para postularte a ofertas de trabajo remoto o para captar proyectos freelance.
                </p>
              </div>

              {/* 🎯 PRESENTATION MODE SELECTOR (CV vs FREELANCE) */}
              <div className="p-6 sm:p-8 rounded-3xl border-2 border-[var(--accent)] bg-[var(--bg-surface)] relative overflow-hidden shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] block mb-1">
                      Configuración Principal
                    </span>
                    <h2 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                      Modo de Presentación del Sitio
                    </h2>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
                      Elige el enfoque con el que se mostrará tu sitio web al compartirlo:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mode CV */}
                  <div
                    onClick={() => {
                      setPresentationMode('cv')
                      showToast('¡Modo cambiado a Hoja de Vida / CV Remoto!')
                    }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      data.settings.presentationMode === 'cv'
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg ring-2 ring-[var(--accent)]/50'
                        : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      {data.settings.presentationMode === 'cv' && (
                        <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Activo
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
                      Modo Hoja de Vida / CV (Contratación Remota)
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>Recomendado para empresas &amp; reclutadores:</strong> Destaca tu historial laboral en empresas, logros medibles, botón para descargar tu CV en PDF, competencias estratégicas y formulario para agendar entrevistas de trabajo remoto.
                    </p>
                  </div>

                  {/* Mode Freelance */}
                  <div
                    onClick={() => {
                      setPresentationMode('freelance')
                      showToast('¡Modo cambiado a Freelance & Consultoría!')
                    }}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      data.settings.presentationMode === 'freelance'
                        ? 'border-[var(--accent)] bg-[var(--accent)]/10 shadow-lg ring-2 ring-[var(--accent)]/50'
                        : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:border-[var(--border-hover)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      {data.settings.presentationMode === 'freelance' && (
                        <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Activo
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-1">
                      Modo Freelance &amp; Consultoría
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      <strong>Para clientes directos:</strong> Destaca tus servicios de consultoría independiente, entregables comerciales, rangos de presupuesto y cotizaciones para proyectos específicos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Historial Laboral', value: data.experience?.length || 0, color: 'text-emerald-400', tab: 'experience' },
                  { label: 'Campañas / Casos', value: data.projects.length, color: 'text-purple-400', tab: 'projects' },
                  { label: 'Competencias / Servicios', value: data.services.length, color: 'text-rose-400', tab: 'services' },
                  { label: 'Herramientas Stack', value: data.tools.length, color: 'text-sky-400', tab: 'tools' }
                ].map((stat) => (
                  <div
                    key={stat.label}
                    onClick={() => { setActiveTab(stat.tab as any); resetAllSubForms() }}
                    className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[var(--accent)] cursor-pointer transition-all hover:-translate-y-1"
                  >
                    <span className="text-xs font-mono uppercase text-[var(--text-muted)] block mb-1">{stat.label}</span>
                    <span className={`font-display font-extrabold text-3xl ${stat.color}`}>{stat.value}</span>
                    <span className="text-[10px] text-[var(--text-muted)] block mt-1">Gestionar CRUD →</span>
                  </div>
                ))}
              </div>

              {/* Direct Link to View Public Portfolio */}
              <div className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">Tu Portafolio está listo para compartir</h4>
                  <p className="text-xs text-[var(--text-secondary)]">Copia este enlace o ábrelo en otra pestaña para verificar cómo lo verán las empresas.</p>
                </div>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0 hover:opacity-90"
                >
                  <Eye className="w-4 h-4" />
                  <span>Abrir Portafolio</span>
                </a>
              </div>
            </div>
          )}

          {/* ═══ WORK EXPERIENCE TAB (CRUD) ═══ */}
          {activeTab === 'experience' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Historial Laboral &amp; Experiencia (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Indispensable para el Modo CV: gestiona los roles, empresas, responsabilidades y logros medibles que verán los reclutadores.
                  </p>
                </div>
                {!isAddingExperience && !editingExperience && (
                  <button
                    onClick={() => {
                      setEditingExperience({
                        id: `exp-${Date.now()}`,
                        role: '',
                        company: '',
                        location: '100% Remoto (Internacional)',
                        period: '2023 - Presente',
                        description: '',
                        achievements: ['Logro 1 con métrica concreta', 'Logro 2'],
                        technologies: ['Meta Ads', 'GA4']
                      })
                      setIsAddingExperience(true)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Empleo / Rol</span>
                  </button>
                )}
              </div>

              {/* Form Add / Edit Work Experience */}
              {editingExperience ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-5 mb-8">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-lg">
                      {isAddingExperience ? 'Añadir Nueva Experiencia Laboral' : 'Editar Experiencia Laboral'}
                    </h4>
                    <button onClick={() => { setEditingExperience(null); setIsAddingExperience(false) }}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Cargo / Posición *</label>
                      <input type="text" value={editingExperience.role}
                        onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                        placeholder="Ej. Senior Growth & Marketing Strategist"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Empresa / Organización *</label>
                      <input type="text" value={editingExperience.company}
                        onChange={(e) => setEditingExperience({ ...editingExperience, company: e.target.value })}
                        placeholder="Ej. Scale Media Group / Agencia Internacional"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Periodo / Años *</label>
                      <input type="text" value={editingExperience.period}
                        onChange={(e) => setEditingExperience({ ...editingExperience, period: e.target.value })}
                        placeholder="Ej. 2022 - Presente o 2020 - 2022"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Modalidad / Ubicación</label>
                      <input type="text" value={editingExperience.location}
                        onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                        placeholder="Ej. 100% Remoto (LATAM & USA) o Híbrido"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Descripción General de Funciones</label>
                    <textarea rows={2} value={editingExperience.description}
                      onChange={(e) => setEditingExperience({ ...editingExperience, description: e.target.value })}
                      placeholder="Breve resumen de las responsabilidades principales del rol..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">
                      Logros Destacados &amp; Métricas (uno por línea)
                    </label>
                    <textarea rows={4}
                      value={editingExperience.achievements?.join('\n') || ''}
                      onChange={(e) => setEditingExperience({
                        ...editingExperience,
                        achievements: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                      })}
                      placeholder="Gestión y optimización de $350K USD anuales con ROAS 4.8x&#10;Reducción de CAC en un 38%&#10;Liderazgo de equipo remoto de 5 personas"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-mono" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">
                      Herramientas &amp; Tecnologías Aplicadas (separadas por coma)
                    </label>
                    <input type="text"
                      value={editingExperience.technologies?.join(', ') || ''}
                      onChange={(e) => setEditingExperience({
                        ...editingExperience,
                        technologies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      placeholder="Meta Ads, Google Analytics 4, Looker Studio, TikTok Ads"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                    <button onClick={() => { setEditingExperience(null); setIsAddingExperience(false) }}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!editingExperience.role || !editingExperience.company) {
                          alert('Por favor ingresa el cargo y la empresa')
                          return
                        }
                        if (isAddingExperience) {
                          addExperience(editingExperience)
                          showToast('¡Experiencia laboral añadida!')
                        } else {
                          updateExperience(editingExperience)
                          showToast('¡Experiencia laboral actualizada!')
                        }
                        setEditingExperience(null)
                        setIsAddingExperience(false)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar Experiencia</span>
                    </button>
                  </div>
                </div>
              ) : null}

              {/* List of Experience */}
              <div className="space-y-4">
                {data.experience?.map((exp) => (
                  <div key={exp.id} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between gap-4 group hover:border-[var(--accent)] transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold text-[var(--accent)]">{exp.period}</span>
                            <span className="text-xs text-[var(--text-muted)]">• {exp.location}</span>
                          </div>
                          <h4 className="font-bold text-lg text-[var(--text-primary)]">{exp.role}</h4>
                          <p className="text-sm text-[var(--text-secondary)] font-semibold flex items-center gap-1.5 mt-0.5">
                            <Building2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                            <span>{exp.company}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => { setEditingExperience(exp); setIsAddingExperience(false) }}
                            className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            title="Editar"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`¿Eliminar la experiencia en "${exp.company}"?`)) {
                                deleteExperience(exp.id)
                                showToast('Experiencia eliminada')
                              }
                            }}
                            className="p-2 rounded-lg border border-[var(--border-color)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{exp.description}</p>

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
                          <span className="text-[10px] font-bold uppercase text-[var(--text-muted)]">Logros Clave:</span>
                          <ul className="list-disc list-inside text-xs text-[var(--text-secondary)] space-y-0.5">
                            {exp.achievements.slice(0, 3).map((ach, i) => (
                              <li key={i} className="truncate">{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ PROJECTS TAB (CRUD) ═══ */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Campañas &amp; Casos de Éxito (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">Demuestra con proyectos reales tus resultados de pauta, branding y crecimiento.</p>
                </div>
                {!isAddingProject && !editingProject && (
                  <button
                    onClick={() => {
                      setEditingProject({
                        id: `proj-${Date.now()}`, title: '', client: '', year: '2025', category: 'Campaña 360',
                        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
                        highlightMetric: '+250% ROI', summary: '', challenge: '', strategy: '', results: '',
                        channels: ['Meta Ads', 'Estrategia'], featured: true
                      })
                      setIsAddingProject(true)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Proyecto</span>
                  </button>
                )}
              </div>

              {editingProject ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-xl">
                      {isAddingProject ? 'Crear Nuevo Proyecto' : 'Editar Proyecto'}
                    </h4>
                    <button onClick={() => { setEditingProject(null); setIsAddingProject(false) }}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Título del Proyecto *</label>
                      <input type="text" value={editingProject.title}
                        onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                        placeholder="Ej. Despertar Sensorial — Lanzamiento Omnicanal"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Cliente / Marca *</label>
                      <input type="text" value={editingProject.client}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        placeholder="Ej. Aura Botanics"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Categoría</label>
                      <select value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]">
                        <option value="Campaña 360">Campaña 360</option>
                        <option value="Performance & Ads">Performance &amp; Ads</option>
                        <option value="Branding">Branding</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Growth">Growth</option>
                        <option value="E-commerce">E-commerce</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Métrica Destacada (Pill)</label>
                      <input type="text" value={editingProject.highlightMetric}
                        onChange={(e) => setEditingProject({ ...editingProject, highlightMetric: e.target.value })}
                        placeholder="Ej. +340% ROAS en 60 días"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Año de Ejecución</label>
                      <input type="text" value={editingProject.year}
                        onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Canales / Disciplinas (separados por coma)</label>
                      <input type="text" value={editingProject.channels?.join(', ') || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, channels: e.target.value.split(',').map(s => s.trim()) })}
                        placeholder="Meta Ads, TikTok Ads, Branding"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Imagen de Portada (URL o Subir archivo)</label>
                    <div className="flex gap-3">
                      <input type="text" value={editingProject.coverImage}
                        onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                      <label className="px-4 py-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent)] cursor-pointer text-xs flex items-center gap-2 bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]">
                        <Upload className="w-4 h-4" /><span>Subir Archivo</span>
                        <input type="file" accept="image/*" className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setEditingProject({ ...editingProject, coverImage: url }))} />
                      </label>
                    </div>
                    {editingProject.coverImage && (
                      <div className="mt-3 w-40 h-24 rounded-xl overflow-hidden border border-[var(--border-color)]">
                        <img src={editingProject.coverImage} alt="preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Resumen Ejecutivo</label>
                    <textarea rows={2} value={editingProject.summary}
                      onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">El Desafío / Problema</label>
                      <textarea rows={3} value={editingProject.challenge || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Estrategia Aplicada</label>
                      <textarea rows={3} value={editingProject.strategy || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, strategy: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Resultados Obtenidos &amp; Métricas</label>
                    <textarea rows={2} value={editingProject.results || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, results: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                    <button onClick={() => { setEditingProject(null); setIsAddingProject(false) }}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!editingProject.title) { alert('Por favor asigna un título'); return }
                        if (isAddingProject) { addProject(editingProject); showToast('¡Proyecto creado!') }
                        else { updateProject(editingProject); showToast('¡Proyecto actualizado!') }
                        setEditingProject(null); setIsAddingProject(false)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar Proyecto</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {data.projects.map((proj) => (
                    <div key={proj.id}
                      className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 group hover:border-[var(--accent)] transition-all">
                      <div className="flex items-center gap-4 min-w-0">
                        <img src={proj.coverImage} alt={proj.title}
                          className="w-16 h-12 rounded-lg object-cover border border-[var(--border-color)] shrink-0" />
                        <div className="truncate">
                          <span className="text-[10px] uppercase font-mono font-bold text-[var(--accent)] block">
                            {proj.category} • {proj.client} ({proj.year})
                          </span>
                          <h4 className="font-bold text-sm text-[var(--text-primary)] truncate">{proj.title}</h4>
                          <span className="text-xs text-emerald-400 font-mono">{proj.highlightMetric}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => { setEditingProject(proj); setIsAddingProject(false) }}
                          className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors" title="Editar">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => { if (window.confirm(`¿Eliminar "${proj.title}"?`)) { deleteProject(proj.id); showToast('Proyecto eliminado.') } }}
                          className="p-2 rounded-lg border border-[var(--border-color)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-400 transition-colors" title="Eliminar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ SERVICES TAB (CRUD) ═══ */}
          {activeTab === 'services' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Competencias Estratégicas / Servicios (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">Crea, edita o elimina las áreas clave de mercadeo y publicidad que dominas.</p>
                </div>
                {!isAddingService && !editingService && (
                  <button
                    onClick={() => {
                      setEditingService({
                        id: `serv-${Date.now()}`,
                        title: '',
                        subtitle: '',
                        description: '',
                        deliverables: ['Estrategia Integral', 'Plan de Ejecución', 'Reporte de Resultados'],
                        icon: 'Sparkles'
                      })
                      setIsAddingService(true)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Competencia / Servicio</span>
                  </button>
                )}
              </div>

              {editingService ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-xl">
                      {isAddingService ? 'Añadir Nueva Competencia' : 'Editar Competencia'}
                    </h4>
                    <button onClick={() => { setEditingService(null); setIsAddingService(false) }}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Título de la Competencia / Servicio *</label>
                      <input type="text" value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        placeholder="Ej. Estrategia de Marca & Posicionamiento"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Subtítulo / Promesa *</label>
                      <input type="text" value={editingService.subtitle}
                        onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                        placeholder="Ej. Construcción de marcas memorables y rentables"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Ícono Visual</label>
                      <select value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]">
                        <option value="Sparkles">Sparkles (Estrategia / Marca)</option>
                        <option value="Target">Target (Paid Media / Performance)</option>
                        <option value="Flame">Flame (Dirección Creativa)</option>
                        <option value="MessageSquareHeart">MessageSquareHeart (Social Media / Contenido)</option>
                        <option value="Workflow">Workflow (Funnels & Automatización)</option>
                        <option value="BarChart3">BarChart3 (Analítica & ROI)</option>
                        <option value="Compass">Compass (Metodología)</option>
                        <option value="Megaphone">Megaphone (Publicidad / Campañas)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Entregables / Capacidades Clave (uno por línea)</label>
                      <textarea rows={3}
                        value={editingService.deliverables.join('\n')}
                        onChange={(e) => setEditingService({
                          ...editingService,
                          deliverables: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)
                        })}
                        placeholder="Brand Book Estratégico&#10;Definición de Buyer Persona&#10;Tono de Voz"
                        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Descripción Detallada *</label>
                    <textarea rows={3} value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      placeholder="Explica qué valor aporta esta competencia a una empresa o marca..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                    <button onClick={() => { setEditingService(null); setIsAddingService(false) }}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!editingService.title) { alert('Por favor asigna un título'); return }
                        if (isAddingService) {
                          addService(editingService)
                          showToast('¡Competencia añadida con éxito!')
                        } else {
                          updateService(editingService)
                          showToast('¡Competencia actualizada!')
                        }
                        setEditingService(null)
                        setIsAddingService(false)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.services.map((service, idx) => (
                    <div key={service.id} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between group hover:border-[var(--accent)] transition-all">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] flex items-center justify-center">
                              {renderServiceIcon(service.icon)}
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-[var(--text-muted)] block">COMPETENCIA 0{idx + 1}</span>
                              <h4 className="font-bold text-base text-[var(--text-primary)]">{service.title}</h4>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => { setEditingService(service); setIsAddingService(false) }}
                              className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                              title="Editar"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`¿Eliminar "${service.title}"?`)) {
                                  deleteService(service.id)
                                  showToast('Eliminada')
                                }
                              }}
                              className="p-2 rounded-lg border border-[var(--border-color)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs font-semibold text-[var(--accent)] mb-2 uppercase">{service.subtitle}</p>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">{service.description}</p>
                      </div>

                      <div className="pt-3 border-t border-[var(--border-color)]">
                        <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block mb-1">Capacidades / Entregables:</span>
                        <div className="flex flex-wrap gap-1">
                          {service.deliverables.map((d, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-main)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TOOLS TAB (CRUD) ═══ */}
          {activeTab === 'tools' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Herramientas &amp; Stack Tecnológico (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">Crea, edita o elimina las plataformas de pauta, analítica, diseño y automatización.</p>
                </div>
                {!isAddingTool && !editingTool && (
                  <button
                    onClick={() => {
                      setEditingTool({
                        id: `tool-${Date.now()}`,
                        name: '',
                        category: 'Pauta & Ads',
                        badge: 'Avanzado'
                      })
                      setIsAddingTool(true)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Herramienta</span>
                  </button>
                )}
              </div>

              {editingTool ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 mb-8">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-lg">
                      {isAddingTool ? 'Añadir Nueva Herramienta' : 'Editar Herramienta'}
                    </h4>
                    <button onClick={() => { setEditingTool(null); setIsAddingTool(false) }}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Nombre del Software / Plataforma *</label>
                      <input type="text" value={editingTool.name}
                        onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                        placeholder="Ej. Meta Ads Manager, GA4, Semrush..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Categoría</label>
                      <select value={editingTool.category}
                        onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]">
                        <option value="Pauta & Ads">Pauta &amp; Ads</option>
                        <option value="Analítica">Analítica</option>
                        <option value="Diseño & Creativo">Diseño &amp; Creativo</option>
                        <option value="Automatización & CRM">Automatización &amp; CRM</option>
                        <option value="Estrategia">Estrategia</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Etiqueta / Nivel</label>
                      <input type="text" value={editingTool.badge || ''}
                        onChange={(e) => setEditingTool({ ...editingTool, badge: e.target.value })}
                        placeholder="Ej. Certificada, Avanzado, Dashboards..."
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button onClick={() => { setEditingTool(null); setIsAddingTool(false) }}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!editingTool.name) { alert('Por favor ingresa el nombre de la herramienta'); return }
                        if (isAddingTool) {
                          addTool(editingTool)
                          showToast('¡Herramienta añadida!')
                        } else {
                          updateTool(editingTool)
                          showToast('¡Herramienta actualizada!')
                        }
                        setEditingTool(null)
                        setIsAddingTool(false)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar</span>
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {data.tools.map((tool) => (
                  <div key={tool.id} className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between group hover:border-[var(--accent)] transition-all">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">{tool.category}</span>
                      <h4 className="font-bold text-sm text-[var(--text-primary)]">{tool.name}</h4>
                      {tool.badge && (
                        <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--accent)] font-medium">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => { setEditingTool(tool); setIsAddingTool(false) }}
                        className="p-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar la herramienta "${tool.name}"?`)) {
                            deleteTool(tool.id)
                            showToast('Herramienta eliminada')
                          }
                        }}
                        className="p-1.5 rounded-lg border border-[var(--border-color)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ EDUCATION TAB (CRUD) ═══ */}
          {activeTab === 'education' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Educación &amp; Certificaciones (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">Gestiona tus títulos universitarios y certificaciones oficiales (Google, Meta, HubSpot, etc.).</p>
                </div>
                {!isAddingEducation && !editingEducation && (
                  <button
                    onClick={() => {
                      setEditingEducation({
                        id: `edu-${Date.now()}`,
                        degree: '',
                        institution: '',
                        period: '2024',
                        type: 'Certificación',
                        credentialId: 'Certificación Oficial'
                      })
                      setIsAddingEducation(true)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Estudio / Certificación</span>
                  </button>
                )}
              </div>

              {editingEducation ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 mb-8">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-lg">
                      {isAddingEducation ? 'Añadir Nuevo Título o Certificación' : 'Editar Título o Certificación'}
                    </h4>
                    <button onClick={() => { setEditingEducation(null); setIsAddingEducation(false) }}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Título / Grado / Certificación *</label>
                      <input type="text" value={editingEducation.degree}
                        onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                        placeholder="Ej. Profesional en Mercadeo y Publicidad"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Institución / Emisor *</label>
                      <input type="text" value={editingEducation.institution}
                        onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                        placeholder="Ej. Universidad Jorge Tadeo Lozano / Google Skillshop"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Tipo</label>
                      <select value={editingEducation.type}
                        onChange={(e) => setEditingEducation({ ...editingEducation, type: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]">
                        <option value="Educación">Educación Universitaria / Grado</option>
                        <option value="Certificación">Certificación Oficial</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Periodo / Año</label>
                      <input type="text" value={editingEducation.period}
                        onChange={(e) => setEditingEducation({ ...editingEducation, period: e.target.value })}
                        placeholder="Ej. 2015 - 2020 o 2024"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">ID de Credencial o Mención (Opcional)</label>
                      <input type="text" value={editingEducation.credentialId || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, credentialId: e.target.value })}
                        placeholder="Ej. ID: META-28491823 o Graduada con Honores"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                    <button onClick={() => { setEditingEducation(null); setIsAddingEducation(false) }}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!editingEducation.degree) { alert('Por favor ingresa el título'); return }
                        if (isAddingEducation) {
                          addEducation(editingEducation)
                          showToast('¡Registro académico añadido!')
                        } else {
                          updateEducation(editingEducation)
                          showToast('¡Registro académico actualizado!')
                        }
                        setEditingEducation(null)
                        setIsAddingEducation(false)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar</span>
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-center justify-between gap-4 group hover:border-[var(--accent)] transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase text-[var(--accent)] font-semibold px-2 py-0.5 rounded bg-[var(--accent)]/10">
                          {edu.type}
                        </span>
                        <span className="text-xs font-mono text-[var(--text-muted)]">{edu.period}</span>
                      </div>
                      <h4 className="font-bold text-base text-[var(--text-primary)]">{edu.degree}</h4>
                      <p className="text-xs text-[var(--text-secondary)]">{edu.institution}</p>
                      {edu.credentialId && (
                        <p className="text-[11px] text-[var(--text-muted)] font-mono mt-1">
                          {edu.credentialId}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingEducation(edu); setIsAddingEducation(false) }}
                        className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar "${edu.degree}"?`)) {
                            deleteEducation(edu.id)
                            showToast('Registro eliminado')
                          }
                        }}
                        className="p-2 rounded-lg border border-[var(--border-color)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ PROFILE & CV TAB ═══ */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl">Perfil Profesional, CV &amp; Contacto</h2>
                <p className="text-xs text-[var(--text-muted)]">Actualiza tu información para empresas, enlaces a tu hoja de vida en PDF y canales directos.</p>
              </div>
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Nombre Completo', key: 'fullName' as const, ph: 'Juliana Rincón' },
                    { label: 'Monograma', key: 'monogram' as const, ph: 'JR' },
                    { label: 'Titular Principal (Headline)', key: 'headline' as const, ph: 'MARKETING & BRAND STRATEGIST' },
                    { label: 'Texto del Badge Superior', key: 'badgeText' as const, ph: 'Disponible para contratación remota' },
                    { label: 'Rol Objetivo / Deseado (Para CV)', key: 'desiredRole' as const, ph: 'Senior Marketing Lead • Growth Strategist' },
                    { label: 'Modalidad de Trabajo', key: 'workType' as const, ph: '100% Remoto (Full-Time / Contrato)' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">{f.label}</label>
                      <input type="text" value={(profileForm as any)[f.key] || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, [f.key]: e.target.value })}
                        placeholder={f.ph}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  ))}
                </div>

                {/* CV PDF Link or Upload */}
                <div className="p-4 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]">
                  <div className="flex items-center gap-2 mb-2 text-[var(--accent)] font-bold text-xs uppercase">
                    <FileText className="w-4 h-4" />
                    <span>Enlace a Hoja de Vida / Resumen (PDF)</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mb-3">
                    Ingresa el link de tu CV en Google Drive / Dropbox, o carga el archivo PDF directamente:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={profileForm.resumeUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, resumeUrl: e.target.value })}
                      placeholder="https://drive.google.com/... o data:application/pdf"
                      className="flex-1 px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                    />
                    <label className="px-4 py-2 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent)] cursor-pointer text-xs flex items-center gap-1.5 bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Cargar PDF</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => {
                          setProfileForm({ ...profileForm, resumeUrl: url })
                          showToast('¡Archivo PDF de CV cargado!')
                        })}
                      />
                    </label>
                  </div>
                </div>

                {/* Photo upload */}
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Foto de Portada / Retrato</label>
                  <div className="flex gap-3">
                    <input type="text" value={profileForm.portraitUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, portraitUrl: e.target.value })}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    <label className="px-4 py-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent)] cursor-pointer text-xs flex items-center gap-2 bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]">
                      <Upload className="w-4 h-4" /><span>Subir Foto</span>
                      <input type="file" accept="image/*" className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setProfileForm({ ...profileForm, portraitUrl: url }))} />
                    </label>
                  </div>
                </div>

                {/* Textos flotantes sobre la foto */}
                <div className="p-5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] space-y-4">
                  <div className="flex items-center gap-2 text-[var(--accent)] font-bold text-xs uppercase">
                    <Sparkles className="w-4 h-4" />
                    <span>Textos Flotantes sobre la Foto del Retrato</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Edita los textos, etiquetas y métricas que aparecen flotando interactivamente sobre tu foto en la portada:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">
                        Badge Superior (Arriba de la foto)
                      </label>
                      <input
                        type="text"
                        value={profileForm.photoBadgeTop || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, photoBadgeTop: e.target.value })}
                        placeholder="Ej. Abierta a Contratación Remota"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">
                        Título de la Tarjeta Inferior
                      </label>
                      <input
                        type="text"
                        value={profileForm.photoBadgeBottomTitle || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, photoBadgeBottomTitle: e.target.value })}
                        placeholder="Ej. Impacto & Performance"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">
                        Subtítulo / Métrica de la Tarjeta Inferior
                      </label>
                      <input
                        type="text"
                        value={profileForm.photoBadgeBottomSubtitle || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, photoBadgeBottomSubtitle: e.target.value })}
                        placeholder="Ej. +4.8x Retorno Promedio Logrado"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">
                        Etiqueta Lateral (Tag / Badge)
                      </label>
                      <input
                        type="text"
                        value={profileForm.photoBadgeBottomTag || ''}
                        onChange={(e) => setProfileForm({ ...profileForm, photoBadgeBottomTag: e.target.value })}
                        placeholder="Ej. Data-Driven o 100% Remoto"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Propuesta de Valor Corta (Hero Subtext)</label>
                  <textarea rows={2} value={profileForm.shortBio}
                    onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Perfil Profesional Extendido</label>
                  <textarea rows={3} value={profileForm.fullBio}
                    onChange={(e) => setProfileForm({ ...profileForm, fullBio: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-color)]">
                  {[
                    { label: 'Email de Contacto', key: 'email' as const },
                    { label: 'Teléfono / WhatsApp', key: 'phone' as const },
                    { label: 'Ubicación & Modalidad', key: 'location' as const },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">{f.label}</label>
                      <input type="text" value={profileForm[f.key]}
                        onChange={(e) => {
                          const upd: any = { ...profileForm, [f.key]: e.target.value }
                          if (f.key === 'phone') upd.whatsapp = e.target.value
                          setProfileForm(upd)
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'LinkedIn', key: 'linkedin' as const },
                    { label: 'Instagram', key: 'instagram' as const },
                    { label: 'Behance', key: 'behance' as const },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">{f.label}</label>
                      <input type="text" value={profileForm.socials[f.key]}
                        onChange={(e) => setProfileForm({ ...profileForm, socials: { ...profileForm.socials, [f.key]: e.target.value } })}
                        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button onClick={() => { updateProfile(profileForm); showToast('¡Perfil actualizado!') }}
                    className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Save className="w-4 h-4" /><span>Guardar Cambios</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══ METRICS TAB ═══ */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl">Métricas de Impacto (Hero Grid)</h2>
                <p className="text-xs text-[var(--text-muted)]">Las 4 cifras clave que demuestran tu rendimiento.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metricsForm.map((m, idx) => (
                  <div key={m.id} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
                    <span className="text-xs font-mono font-bold text-[var(--accent)]">Métrica {idx + 1}</span>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Cifra / Valor</label>
                      <input type="text" value={m.value}
                        onChange={(e) => { const u = [...metricsForm]; u[idx].value = e.target.value; setMetricsForm(u) }}
                        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xl font-display font-bold text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Título</label>
                      <input type="text" value={m.label}
                        onChange={(e) => { const u = [...metricsForm]; u[idx].label = e.target.value; setMetricsForm(u) }}
                        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs font-bold uppercase text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Subtítulo</label>
                      <input type="text" value={m.sublabel || ''}
                        onChange={(e) => { const u = [...metricsForm]; u[idx].sublabel = e.target.value; setMetricsForm(u) }}
                        className="w-full px-4 py-2 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button onClick={() => { updateMetrics(metricsForm); showToast('¡Métricas actualizadas!') }}
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Save className="w-4 h-4" /><span>Guardar Métricas</span>
                </button>
              </div>
            </div>
          )}

          {/* ═══ PROCESS TAB (CRUD) ═══ */}
          {activeTab === 'process' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Metodología &amp; Fases de Trabajo (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">Personaliza las etapas de tu proceso de mercadeo.</p>
                </div>
              </div>

              {editingProcessStep ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 mb-8">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-lg">
                      Editar Fase {editingProcessStep.step}
                    </h4>
                    <button onClick={() => setEditingProcessStep(null)}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Identificador de Fase</label>
                      <input type="text" value={editingProcessStep.step}
                        onChange={(e) => setEditingProcessStep({ ...editingProcessStep, step: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Tagline</label>
                      <input type="text" value={editingProcessStep.tagline}
                        onChange={(e) => setEditingProcessStep({ ...editingProcessStep, tagline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Título de la Fase</label>
                      <input type="text" value={editingProcessStep.title}
                        onChange={(e) => setEditingProcessStep({ ...editingProcessStep, title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Descripción</label>
                      <textarea rows={3} value={editingProcessStep.description}
                        onChange={(e) => setEditingProcessStep({ ...editingProcessStep, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                    <button onClick={() => setEditingProcessStep(null)}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        const updated = data.process.map(p => p.id === editingProcessStep.id ? editingProcessStep : p)
                        updateProcess(updated)
                        showToast('¡Fase actualizada!')
                        setEditingProcessStep(null)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar Fase</span>
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="space-y-3">
                {data.process.map((step) => (
                  <div key={step.id} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-start justify-between gap-4 group hover:border-[var(--accent)] transition-all">
                    <div className="flex items-start gap-4">
                      <span className="font-display font-extrabold text-3xl text-[var(--accent)] shrink-0">{step.step}</span>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block mb-0.5">{step.tagline}</span>
                        <h4 className="font-bold text-base text-[var(--text-primary)]">{step.title}</h4>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-1">{step.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setEditingProcessStep(step)}
                      className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                      title="Editar Fase"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ TESTIMONIALS TAB (CRUD) ═══ */}
          {activeTab === 'testimonials' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl">Testimonios de Clientes &amp; Líderes (CRUD)</h2>
                  <p className="text-xs text-[var(--text-muted)]">Recomendaciones laborales y validaciones de desempeño.</p>
                </div>
                {!isAddingTestimonial && !editingTestimonial && (
                  <button
                    onClick={() => {
                      setEditingTestimonial({
                        id: `test-${Date.now()}`,
                        author: '',
                        role: '',
                        company: '',
                        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
                        quote: '',
                        metricResult: '+150% Crecimiento'
                      })
                      setIsAddingTestimonial(true)
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--accent)] text-white shadow-md hover:opacity-90"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Añadir Testimonio</span>
                  </button>
                )}
              </div>

              {editingTestimonial ? (
                <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] space-y-4 mb-8">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                    <h4 className="font-display font-bold text-lg">
                      {isAddingTestimonial ? 'Crear Nuevo Testimonio' : 'Editar Testimonio'}
                    </h4>
                    <button onClick={() => { setEditingTestimonial(null); setIsAddingTestimonial(false) }}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Nombre del Autor *</label>
                      <input type="text" value={editingTestimonial.author}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                        placeholder="Ej. Camila Restrepo"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Cargo / Rol *</label>
                      <input type="text" value={editingTestimonial.role}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                        placeholder="Ej. CEO & Co-fundadora"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Empresa / Marca *</label>
                      <input type="text" value={editingTestimonial.company}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                        placeholder="Ej. Aura Botanics"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Foto / Avatar (URL o Subir archivo)</label>
                      <div className="flex gap-2">
                        <input type="text" value={editingTestimonial.avatarUrl}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, avatarUrl: e.target.value })}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                        <label className="px-4 py-2.5 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent)] cursor-pointer text-xs flex items-center gap-2 bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)]">
                          <Upload className="w-4 h-4" /><span>Subir</span>
                          <input type="file" accept="image/*" className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setEditingTestimonial({ ...editingTestimonial, avatarUrl: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Métrica Destacada</label>
                      <input type="text" value={editingTestimonial.metricResult || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, metricResult: e.target.value })}
                        placeholder="Ej. +340% Crecimiento"
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[var(--text-secondary)]">Testimonio / Comentario *</label>
                    <textarea rows={3} value={editingTestimonial.quote}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                      placeholder="Opinión del líder o cliente sobre Juliana..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                    <button onClick={() => { setEditingTestimonial(null); setIsAddingTestimonial(false) }}
                      className="px-5 py-2.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        if (!editingTestimonial.author) { alert('Por favor ingresa el autor'); return }
                        if (isAddingTestimonial) {
                          addTestimonial(editingTestimonial)
                          showToast('¡Testimonio añadido!')
                        } else {
                          updateTestimonial(editingTestimonial)
                          showToast('¡Testimonio actualizado!')
                        }
                        setEditingTestimonial(null)
                        setIsAddingTestimonial(false)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /><span>Guardar Testimonio</span>
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="space-y-3">
                {data.testimonials.map((test) => (
                  <div key={test.id} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex items-start justify-between gap-4 group hover:border-[var(--accent)] transition-all">
                    <div className="flex items-start gap-4">
                      <img src={test.avatarUrl} alt={test.author} className="w-12 h-12 rounded-full object-cover border border-[var(--border-color)] shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-[var(--text-primary)]">{test.author}</h4>
                          <span className="text-xs text-[var(--text-muted)]">• {test.role}, <span className="text-[var(--text-secondary)]">{test.company}</span></span>
                        </div>
                        {test.metricResult && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[10px] font-mono font-bold text-[var(--accent)] mb-2">
                            {test.metricResult}
                          </span>
                        )}
                        <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed font-serif-luxury">
                          "{test.quote}"
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingTestimonial(test); setIsAddingTestimonial(false) }}
                        className="p-2 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`¿Eliminar testimonio de "${test.author}"?`)) {
                            deleteTestimonial(test.id)
                            showToast('Testimonio eliminado')
                          }
                        }}
                        className="p-2 rounded-lg border border-[var(--border-color)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ SETTINGS & THEME TAB ═══ */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl">Tema Visual, Seguridad &amp; Respaldo</h2>
                <p className="text-xs text-[var(--text-muted)]">Configura la estética del sitio público, tu clave de seguridad y gestiona copias de respaldo JSON.</p>
              </div>

              {/* Theme Selector */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                <div className="flex items-center gap-3 mb-2">
                  <Palette className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="font-bold text-lg text-[var(--text-primary)]">Tema Visual del Portafolio</h3>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mb-6">
                  El cambio se aplica inmediatamente en el sitio público.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {([
                    { id: 'obsidian' as ThemeMode, name: 'Obsidian Noir', desc: 'Oscuro de alto impacto, titanio y glassmorphism (Referencia 1).', preview: 'bg-neutral-900 border-purple-500/50' },
                    { id: 'champagne' as ThemeMode, name: 'Editorial Sage', desc: 'Lujo cálido, tonos pergamino y tipografía serif (Referencia 2).', preview: 'bg-[#EDE8DC] border-[#748070]' },
                    { id: 'crimson' as ThemeMode, name: 'Swiss Crimson', desc: 'Contraste editorial suizo con acento rojo carmesí (Referencia 3).', preview: 'bg-[#DFDBD2] border-[#e11d48]' }
                  ]).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setTheme(t.id); showToast(`Tema cambiado a ${t.name}`) }}
                      className={`p-5 rounded-2xl border text-left transition-all group ${
                        data.settings.theme === t.id
                          ? 'border-[var(--accent)] ring-2 ring-[var(--accent)] bg-[var(--accent)]/10'
                          : 'border-[var(--border-color)] bg-[var(--bg-main)] hover:border-[var(--border-hover)]'
                      }`}
                    >
                      <div className={`w-full h-16 rounded-xl border-2 mb-4 ${t.preview}`} />
                      <span className="font-bold text-sm block mb-1 text-[var(--text-primary)]">{t.name}</span>
                      <span className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{t.desc}</span>
                      {data.settings.theme === t.id && (
                        <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-[var(--accent)]">
                          <Check className="w-3.5 h-3.5" /> Activo
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Change Admin PIN */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Cambiar Contraseña de Acceso</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-4">Actualiza la clave para proteger esta ruta privada `/admin`.</p>
                <div className="flex gap-3 max-w-md">
                  <input type="text" defaultValue={data.settings.adminPin} id="newPinInput" placeholder="Nueva clave"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-main)] border border-[var(--border-color)] text-sm font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
                  <button onClick={() => { const i = document.getElementById('newPinInput') as HTMLInputElement; if (i?.value) { updateAdminPin(i.value); showToast('¡Contraseña actualizada!') } }}
                    className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider">Actualizar</button>
                </div>
              </div>

              {/* Backup & Restore */}
              <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)]">
                <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">Respaldo &amp; Seguridad de Datos</h3>
                <p className="text-xs text-[var(--text-secondary)] mb-6">
                  Todos los datos y modificaciones quedan almacenados en el navegador. Descarga un archivo JSON para respaldo o para importarlo en cualquier momento.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button onClick={exportDataJson}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-emerald-500 transition-all">
                    <Download className="w-4 h-4" /><span>Descargar Respaldo (JSON)</span>
                  </button>
                  <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--border-color)] hover:border-[var(--accent)] text-xs font-bold uppercase tracking-wider cursor-pointer bg-[var(--bg-main)] text-[var(--text-primary)]">
                    <Upload className="w-4 h-4" /><span>Restaurar desde JSON</span>
                    <input type="file" accept=".json" className="hidden" onChange={handleFileImport} />
                  </label>
                  <button onClick={resetToDefault}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold uppercase tracking-wider transition-all ml-auto">
                    <RotateCcw className="w-4 h-4" /><span>Restablecer Datos Iniciales</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
