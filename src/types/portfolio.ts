export type ThemeMode = 'obsidian' | 'champagne' | 'crimson'
export type PresentationMode = 'cv' | 'freelance'

export interface WorkExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  technologies?: string[]
}

export interface ProfileData {
  fullName: string
  monogram: string
  headline: string
  badgeText: string
  shortBio: string
  fullBio: string
  portraitUrl: string
  resumeUrl: string
  email: string
  phone: string
  whatsapp: string
  location: string
  availabilityStatus: string
  isAvailable: boolean
  desiredRole?: string
  workType?: string
  photoBadgeTop?: string
  photoBadgeBottomTitle?: string
  photoBadgeBottomSubtitle?: string
  photoBadgeBottomTag?: string
  socials: {
    linkedin: string
    instagram: string
    behance: string
    twitter: string
    tiktok?: string
  }
}

export interface MetricItem {
  id: string
  value: string
  label: string
  sublabel?: string
}

export interface ProjectItem {
  id: string
  title: string
  client: string
  year: string
  category: 'Branding' | 'Performance & Ads' | 'Campaña 360' | 'Social Media' | 'Growth' | 'E-commerce'
  coverImage: string
  gallery?: string[]
  highlightMetric: string
  summary: string
  challenge?: string
  strategy?: string
  results?: string
  channels?: string[]
  externalUrl?: string
  featured: boolean
}

export interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  deliverables: string[]
  icon: string
}

export interface ToolItem {
  id: string
  name: string
  category: 'Pauta & Ads' | 'Analítica' | 'Diseño & Creativo' | 'Automatización & CRM' | 'Estrategia'
  badge?: string
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  period: string
  type: 'Educación' | 'Certificación'
  credentialId?: string
}

export interface ProcessItem {
  id: string
  step: string
  title: string
  tagline: string
  description: string
}

export interface TestimonialItem {
  id: string
  author: string
  role: string
  company: string
  avatarUrl: string
  quote: string
  metricResult?: string
}

export interface SiteSettings {
  theme: ThemeMode
  adminPin: string
  siteTitle: string
  presentationMode: PresentationMode // 'cv' | 'freelance'
}

export interface PortfolioData {
  profile: ProfileData
  metrics: MetricItem[]
  projects: ProjectItem[]
  services: ServiceItem[]
  tools: ToolItem[]
  education: EducationItem[]
  experience: WorkExperienceItem[]
  process: ProcessItem[]
  testimonials: TestimonialItem[]
  settings: SiteSettings
}
