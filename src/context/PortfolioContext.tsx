import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import {
  PortfolioData,
  ProjectItem,
  ServiceItem,
  ToolItem,
  EducationItem,
  WorkExperienceItem,
  TestimonialItem,
  ThemeMode,
  PresentationMode,
  ProfileData,
  MetricItem,
  ProcessItem,
  FirebaseConfig,
  FirebaseSyncStatus
} from '../types/portfolio'
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData'
import {
  getActiveFirebaseConfig,
  saveStoredFirebaseConfig,
  clearStoredFirebaseConfig,
  testFirebaseConnection,
  savePortfolioToFirestore,
  loadPortfolioFromFirestore,
  subscribeToPortfolioFromFirestore
} from '../services/firebase'

interface PortfolioContextType {
  data: PortfolioData
  updateProfile: (profile: ProfileData) => void
  updateMetrics: (metrics: MetricItem[]) => void
  addProject: (project: ProjectItem) => void
  updateProject: (project: ProjectItem) => void
  deleteProject: (id: string) => void
  addService: (service: ServiceItem) => void
  updateService: (service: ServiceItem) => void
  deleteService: (id: string) => void
  addTool: (tool: ToolItem) => void
  updateTool: (tool: ToolItem) => void
  deleteTool: (id: string) => void
  addEducation: (edu: EducationItem) => void
  updateEducation: (edu: EducationItem) => void
  deleteEducation: (id: string) => void
  addExperience: (exp: WorkExperienceItem) => void
  updateExperience: (exp: WorkExperienceItem) => void
  deleteExperience: (id: string) => void
  updateProcess: (process: ProcessItem[]) => void
  addTestimonial: (test: TestimonialItem) => void
  updateTestimonial: (test: TestimonialItem) => void
  deleteTestimonial: (id: string) => void
  setTheme: (theme: ThemeMode) => void
  setPresentationMode: (mode: PresentationMode) => void
  updateAdminPin: (pin: string) => void
  resetToDefault: () => void
  exportDataJson: () => void
  importDataJson: (jsonData: string) => boolean
  // Public modal states (no admin)
  selectedProject: ProjectItem | null
  setSelectedProject: (p: ProjectItem | null) => void
  isContactModalOpen: boolean
  setIsContactModalOpen: (open: boolean) => void
  isCvModalOpen: boolean
  setIsCvModalOpen: (open: boolean) => void
  // Firebase Cloud Database sync
  firebaseStatus: FirebaseSyncStatus
  isFirebaseConnected: boolean
  saveFirebaseConfig: (config: FirebaseConfig) => Promise<{ success: boolean; message: string }>
  disconnectFirebase: () => void
  syncCurrentDataToCloud: () => Promise<boolean>
  pullDataFromCloud: () => Promise<boolean>
}

const STORAGE_KEY = 'juliana_portfolio_v1'

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
          settings: { ...INITIAL_PORTFOLIO_DATA.settings, ...(parsed.settings || {}) },
          experience: parsed.experience && parsed.experience.length > 0
            ? parsed.experience
            : INITIAL_PORTFOLIO_DATA.experience
        }
      }
    } catch (e) {
      console.error('Error loading portfolio data from localStorage', e)
    }
    return INITIAL_PORTFOLIO_DATA
  })

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)

  // Firebase status
  const [firebaseStatus, setFirebaseStatus] = useState<FirebaseSyncStatus>('unconfigured')
  const isUpdatingFromCloudRef = useRef(false)
  const isInitialMount = useRef(true)

  // ─── INITIALIZE FIREBASE & REALTIME SYNC ─────────────────────
  useEffect(() => {
    const config = getActiveFirebaseConfig()
    if (!config || !config.apiKey || !config.projectId) {
      setFirebaseStatus('unconfigured')
      return
    }

    setFirebaseStatus('connecting')

    // Subscribe to real-time changes from Firestore
    const unsubscribe = subscribeToPortfolioFromFirestore(
      (cloudData) => {
        if (cloudData && cloudData.profile) {
          isUpdatingFromCloudRef.current = true
          setData((prev) => ({
            ...INITIAL_PORTFOLIO_DATA,
            ...cloudData,
            profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(cloudData.profile || {}) },
            settings: { ...INITIAL_PORTFOLIO_DATA.settings, ...(cloudData.settings || {}) },
            experience: cloudData.experience && cloudData.experience.length > 0
              ? cloudData.experience
              : (prev.experience && prev.experience.length > 0 ? prev.experience : INITIAL_PORTFOLIO_DATA.experience)
          }))
          setFirebaseStatus('connected')
        }
      },
      (error) => {
        console.error('Firestore listener error:', error)
        setFirebaseStatus('error')
      }
    )

    // Initial check: if document does not exist, seed it with current local data
    loadPortfolioFromFirestore()
      .then((existingData) => {
        if (existingData) {
          setFirebaseStatus('connected')
        } else {
          savePortfolioToFirestore(data).then((saved) => {
            if (saved) setFirebaseStatus('connected')
          })
        }
      })
      .catch((err) => {
        console.error('Error loading initial Firestore data:', err)
        setFirebaseStatus('error')
      })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  // ─── LOCALSTORAGE PERSISTENCE ────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving portfolio data to localStorage', e)
    }
  }, [data])

  // ─── AUTO-SYNC TO CLOUD (DEBOUNCED) ──────────────────────────
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    // Skip echo write if this update was triggered by an incoming cloud snapshot
    if (isUpdatingFromCloudRef.current) {
      isUpdatingFromCloudRef.current = false
      return
    }

    const config = getActiveFirebaseConfig()
    if (!config || !config.apiKey || !config.projectId) return

    const timer = setTimeout(() => {
      savePortfolioToFirestore(data).then((ok) => {
        if (ok) {
          setFirebaseStatus('connected')
        }
      })
    }, 700)

    return () => clearTimeout(timer)
  }, [data])

  // Sync html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', data.settings.theme)
  }, [data.settings.theme])

  // ─── FIREBASE CONFIG ACTIONS ─────────────────────────────────
  const saveFirebaseConfigHandler = async (
    config: FirebaseConfig
  ): Promise<{ success: boolean; message: string }> => {
    setFirebaseStatus('connecting')
    saveStoredFirebaseConfig(config)
    const test = await testFirebaseConnection(config)
    if (!test.success) {
      setFirebaseStatus('error')
      return test
    }

    // Try to load cloud data, or push local data to seed
    const cloudData = await loadPortfolioFromFirestore()
    if (cloudData && cloudData.profile?.fullName) {
      isUpdatingFromCloudRef.current = true
      setData({
        ...INITIAL_PORTFOLIO_DATA,
        ...cloudData,
        profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(cloudData.profile || {}) },
        settings: { ...INITIAL_PORTFOLIO_DATA.settings, ...(cloudData.settings || {}) }
      })
    } else {
      await savePortfolioToFirestore(data)
    }

    setFirebaseStatus('connected')
    return { success: true, message: '¡Conectado exitosamente con Firebase Firestore!' }
  }

  const disconnectFirebaseHandler = () => {
    clearStoredFirebaseConfig()
    setFirebaseStatus('unconfigured')
  }

  const syncCurrentDataToCloud = async (): Promise<boolean> => {
    setFirebaseStatus('syncing')
    const success = await savePortfolioToFirestore(data)
    setFirebaseStatus(success ? 'connected' : 'error')
    return success
  }

  const pullDataFromCloud = async (): Promise<boolean> => {
    setFirebaseStatus('syncing')
    const cloudData = await loadPortfolioFromFirestore()
    if (cloudData) {
      isUpdatingFromCloudRef.current = true
      setData({
        ...INITIAL_PORTFOLIO_DATA,
        ...cloudData,
        profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(cloudData.profile || {}) },
        settings: { ...INITIAL_PORTFOLIO_DATA.settings, ...(cloudData.settings || {}) }
      })
      setFirebaseStatus('connected')
      return true
    }
    setFirebaseStatus('error')
    return false
  }

  // ─── MUTATIONS ───────────────────────────────────────────────
  const updateProfile = (profile: ProfileData) => {
    setData((prev) => ({ ...prev, profile }))
  }

  const updateMetrics = (metrics: MetricItem[]) => {
    setData((prev) => ({ ...prev, metrics }))
  }

  const addProject = (project: ProjectItem) => {
    setData((prev) => ({ ...prev, projects: [project, ...prev.projects] }))
  }

  const updateProject = (project: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p))
    }))
  }

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }))
  }

  const addService = (service: ServiceItem) => {
    setData((prev) => ({ ...prev, services: [...prev.services, service] }))
  }

  const updateService = (service: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === service.id ? service : s))
    }))
  }

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id)
    }))
  }

  const addTool = (tool: ToolItem) => {
    setData((prev) => ({ ...prev, tools: [...prev.tools, tool] }))
  }

  const updateTool = (tool: ToolItem) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.map((t) => (t.id === tool.id ? tool : t))
    }))
  }

  const deleteTool = (id: string) => {
    setData((prev) => ({
      ...prev,
      tools: prev.tools.filter((t) => t.id !== id)
    }))
  }

  const addEducation = (edu: EducationItem) => {
    setData((prev) => ({ ...prev, education: [...prev.education, edu] }))
  }

  const updateEducation = (edu: EducationItem) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === edu.id ? edu : e))
    }))
  }

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id)
    }))
  }

  const addExperience = (exp: WorkExperienceItem) => {
    setData((prev) => ({
      ...prev,
      experience: [exp, ...(prev.experience || [])]
    }))
  }

  const updateExperience = (exp: WorkExperienceItem) => {
    setData((prev) => ({
      ...prev,
      experience: (prev.experience || []).map((e) => (e.id === exp.id ? exp : e))
    }))
  }

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: (prev.experience || []).filter((e) => e.id !== id)
    }))
  }

  const updateProcess = (process: ProcessItem[]) => {
    setData((prev) => ({ ...prev, process }))
  }

  const addTestimonial = (test: TestimonialItem) => {
    setData((prev) => ({ ...prev, testimonials: [...prev.testimonials, test] }))
  }

  const updateTestimonial = (test: TestimonialItem) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === test.id ? test : t))
    }))
  }

  const deleteTestimonial = (id: string) => {
    setData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }))
  }

  const setTheme = (theme: ThemeMode) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, theme }
    }))
  }

  const setPresentationMode = (presentationMode: PresentationMode) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, presentationMode }
    }))
  }

  const updateAdminPin = (pin: string) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, adminPin: pin }
    }))
  }

  const resetToDefault = () => {
    if (
      window.confirm(
        '¿Segura que deseas restaurar los datos por defecto? Se perderán las modificaciones no respaldadas.'
      )
    ) {
      setData(INITIAL_PORTFOLIO_DATA)
      localStorage.removeItem(STORAGE_KEY)
      savePortfolioToFirestore(INITIAL_PORTFOLIO_DATA)
    }
  }

  const exportDataJson = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute(
      'download',
      `portfolio_juliana_backup_${new Date().toISOString().slice(0, 10)}.json`
    )
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const importDataJson = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData)
      if (parsed.profile && parsed.projects) {
        setData(parsed)
        savePortfolioToFirestore(parsed)
        return true
      }
      return false
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return (
    <PortfolioContext.Provider
      value={{
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
        importDataJson,
        selectedProject,
        setSelectedProject,
        isContactModalOpen,
        setIsContactModalOpen,
        isCvModalOpen,
        setIsCvModalOpen,
        // Firebase Cloud DB
        firebaseStatus,
        isFirebaseConnected: firebaseStatus === 'connected' || firebaseStatus === 'syncing',
        saveFirebaseConfig: saveFirebaseConfigHandler,
        disconnectFirebase: disconnectFirebaseHandler,
        syncCurrentDataToCloud,
        pullDataFromCloud
      }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
