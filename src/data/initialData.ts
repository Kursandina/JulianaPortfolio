import { PortfolioData } from '../types/portfolio'

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    fullName: "Juliana Rincón",
    monogram: "JR",
    headline: "MARKETING & BRAND STRATEGIST",
    badgeText: "DISPONIBLE PARA CONTRATACIÓN REMOTA ↗",
    shortBio: "Profesional en Mercadeo y Publicidad con más de 6 años liderando estrategias omnicanal, crecimiento de marca y optimización de pauta digital para empresas globales y startups.",
    fullBio: "Soy profesional en Mercadeo y Publicidad con un historial comprobado liderando estrategias de marketing 360°, adquisición de usuarios y posicionamiento de marca en entornos 100% remotos. Combino visión estratégica, sensibilidad creativa y rigor analítico en la toma de decisiones data-driven. He gestionado equipos multidisciplinarios remotos y optimizado presupuestos publicitarios logrando altos retornos de inversión (ROAS +4.8x) y reducciones consistentes en el costo de adquisición (CAC).",
    portraitUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    resumeUrl: "#",
    email: "juliana.rincon.mkt@gmail.com",
    phone: "+57 (312) 845-6789",
    whatsapp: "+573128456789",
    location: "Bogotá, Colombia • 100% Remoto (Disponibilidad Global)",
    availabilityStatus: "Abierta a oportunidades laborales remotas (Full-time / Contrato a largo plazo) en roles de liderazgo de marketing, estrategia de marca y growth.",
    isAvailable: true,
    desiredRole: "Senior Marketing Lead • Growth & Brand Strategist",
    workType: "100% Remoto (Tiempo Completo / Contrato Internacional)",
    photoBadgeTop: "Abierta a Contratación Remota",
    photoBadgeBottomTitle: "Impacto & Performance",
    photoBadgeBottomSubtitle: "+4.8x Retorno Promedio Logrado",
    photoBadgeBottomTag: "Data-Driven",
    socials: {
      linkedin: "https://linkedin.com/in/juliana-rincon",
      instagram: "https://instagram.com/juliana.mkt",
      behance: "https://behance.net/julianarincon",
      twitter: "https://twitter.com/juliana_ads",
      tiktok: "https://tiktok.com/@juliana.strategy"
    }
  },
  metrics: [
    {
      id: "m-1",
      value: "6+",
      label: "Años de Trayectoria",
      sublabel: "En mercadeo estratégico y publicidad"
    },
    {
      id: "m-2",
      value: "45+",
      label: "Campañas Lideradas",
      sublabel: "B2C, B2B, SaaS y E-commerce"
    },
    {
      id: "m-3",
      value: "+4.8x",
      label: "ROAS Promedio Logrado",
      sublabel: "Retorno en pauta y conversión"
    },
    {
      id: "m-4",
      value: "100%",
      label: "Orientación Remota",
      sublabel: "Gestión autónoma y en equipo global"
    }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Senior Growth & Digital Marketing Strategist",
      company: "NovaScale Media Group (Agencia de Crecimiento)",
      location: "100% Remoto (LATAM & USA)",
      period: "2022 - Presente",
      description: "Liderazgo de estrategias integrales de adquisición de clientes, pauta digital y optimización de conversión para startups tecnológicas y marcas de consumo en expansión internacional.",
      achievements: [
        "Gestión y optimización de más de $350,000 USD anuales en pauta paga (Meta Ads, Google Ads, TikTok Ads) manteniendo un ROAS promedio de 4.8x.",
        "Dirección y mentoría de un equipo remoto de 5 personas compuesto por media buyers, diseñadores creativos y redactores.",
        "Reducción sostenida del Costo de Adquisición de Clientes (CAC) en un 38% mediante experimentación continua de copys, audiencias y landings A/B.",
        "Implementación de dashboards ejecutivos en Looker Studio para atribución multicanal y reportes semanales al C-Level."
      ],
      technologies: ["Meta Ads", "Google Ads", "GA4", "Looker Studio", "Klaviyo", "TikTok Ads"]
    },
    {
      id: "exp-2",
      role: "Lead de Mercadeo & Estrategia Publicitaria",
      company: "Grupo Vía Marketing & Retail",
      location: "Remoto / Híbrido • Bogotá",
      period: "2020 - 2022",
      description: "Planificación y dirección creativa de campañas de lanzamiento y posicionamiento para marcas prémium de bienestar, tecnología y consumo.",
      achievements: [
        "Estructuración de lanzamientos omnicanal para 6 nuevas líneas comerciales, generando más de $1.2M USD en ventas durante el primer año.",
        "Crecimiento de comunidades digitales de 15,000 a +180,000 miembros orgánicos mediante formatos de video vertical y storytelling de marca.",
        "Coordinación de alianzas con más de 40 creadores de contenido e influencers, incrementando el brand awareness en un 65%."
      ],
      technologies: ["HubSpot CRM", "Adobe Creative Suite", "Figma", "Asana", "Hootsuite"]
    },
    {
      id: "exp-3",
      role: "Especialista en Publicidad Digital & Contenidos",
      company: "BrandCrafters Studio",
      location: "100% Remoto",
      period: "2018 - 2020",
      description: "Diseño de conceptos publicitarios, redacción de copys de alta persuasión y análisis de rendimiento de anuncios.",
      achievements: [
        "Creación de más de 300 piezas publicitarias con tasas de retención superiores al 45% en los primeros 3 segundos.",
        "Automatización de embudos de email marketing que aumentaron la tasa de recompra de clientes en un 28%."
      ],
      technologies: ["Meta Business Suite", "Google Ads", "Mailchimp", "Canva Pro", "WordPress"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Despertar Sensorial — Lanzamiento Omnicanal",
      client: "Aura Botanics (Cosmética Consciente)",
      year: "2024",
      category: "Campaña 360",
      coverImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      highlightMetric: "+340% ROAS en 60 días",
      summary: "Dirección creativa y estrategia integral de medios para la nueva línea botánica prémium. Campaña sincronizada en Meta Ads, TikTok y activaciones de relaciones públicas con micro-influencers del sector bienestar.",
      challenge: "Aura Botanics buscaba diferenciarse en un saturado mercado cosmético con un presupuesto acotado, necesitando un lanzamiento que generara reconocimiento de marca y ventas directas simultáneamente.",
      strategy: "Diseñamos un concepto publicitario basado en 'El Lujo Silencioso del Autocuidado', implementando un funnel de contenidos educativos, pauta segmentada por intereses de sostenibilidad y una preventa exclusiva para comunidad VIP.",
      results: "Se logró un ROAS récord de 4.2x en el primer mes, +1.8 millones de impactos de marca y un sold-out de 3,500 unidades en tiempo récord.",
      channels: ["Meta Ads", "TikTok Ads", "Influencer Marketing", "Email Nurturing", "Dirección de Arte"],
      externalUrl: "https://behance.net",
      featured: true
    },
    {
      id: "proj-2",
      title: "Fintech Niva — Escalamiento de Adquisición Digital",
      client: "Niva Financial App",
      year: "2024",
      category: "Performance & Ads",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      highlightMetric: "-45% Costo de Adquisición (CAC)",
      summary: "Reestructuración profunda de la estrategia de pauta paga (Paid Acquisition) y experimentación continua de copys y creativos dinámicos para captar usuarios bancarizados jóvenes.",
      challenge: "El costo por instalación y activación de cuenta se había disparado en un 80% debido a la saturación de los canales convencionales de Google y Meta.",
      strategy: "Desarrollamos una batería de creativos nativos tipo UGC (User-Generated Content), combinados con campañas de video corto en TikTok y Google App Campaigns, optimizando el evento de activación de cuenta.",
      results: "Reducción sostenida del 45% en CAC, adquisición de +28,000 nuevos usuarios verificados y un aumento del 65% en la retención del primer mes.",
      channels: ["Google UAC", "Meta Ads", "TikTok Spark Ads", "Looker Studio", "A/B Testing"],
      externalUrl: "https://behance.net",
      featured: true
    },
    {
      id: "proj-3",
      title: "Verve Studio — Rediseño de Identidad & Posicionamiento",
      client: "Verve Architecture & Interiors",
      year: "2023",
      category: "Branding",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      highlightMetric: "+220% Leads Calificados",
      summary: "Estrategia integral de reposicionamiento de marca para estudio de arquitectura de lujo, redefiniendo su propuesta de valor, tono de voz editorial y presencia digital.",
      challenge: "El estudio recibía prospectos que no coincidían con sus tarifas de proyectos de alto valor adquisitivo y carecía de una narrativa que transmitiera sofisticación.",
      strategy: "Auditoría de percepción de marca, creación de libro de marca, nuevo sitio web interactivo con portafolio inmersivo y campaña selectiva en LinkedIn Ads dirigida a inversores inmobiliarios.",
      results: "Cierre de 4 proyectos residenciales de gran escala en 4 meses y aumento del ticket promedio de venta en un 70%.",
      channels: ["Brand Guidelines", "Narrativa de Marca", "LinkedIn Ads", "Relaciones Públicas"],
      externalUrl: "https://behance.net",
      featured: true
    },
    {
      id: "proj-4",
      title: "Origen Supremo — Viralidad & Fidelización de Comunidad",
      client: "Café Origen Supremo",
      year: "2023",
      category: "Social Media",
      coverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
      highlightMetric: "+850K Reproducciones Orgánicas",
      summary: "Estrategia de contenidos en video vertical (Reels y TikTok) centrada en la cultura cafetera artesanal colombiana y marketing de comunidad interactivo.",
      challenge: "Transformar una marca tradicional con baja interacción digital en un referente de culto para amantes del café de especialidad.",
      strategy: "Creación de series semanales de micro-documentales, guiones humorísticos de oficina y un club de suscripción mensual con lanzamientos de edición limitada.",
      results: "Crecimiento del 280% en seguidores orgánicos en 90 días, tasa de interacción (engagement) del 6.8% y un incremento del 92% en compras recurrentes en tienda online.",
      channels: ["Reels & TikTok", "Copywriting", "Community Management", "Klaviyo Email"],
      externalUrl: "https://behance.net",
      featured: false
    },
    {
      id: "proj-5",
      title: "PulseMetrics — Estrategia de Crecimiento B2B",
      client: "PulseMetrics SaaS",
      year: "2024",
      category: "Growth",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      highlightMetric: "Pipeline de +$180K USD",
      summary: "Diseño de un funnel de ventas B2B multietapa utilizando seminarios web con líderes de la industria, lead magnets de alto valor y automatización de prospección.",
      challenge: "Generar demos de producto calificadas para directores de marketing y analítica sin depender exclusivamente de llamadas en frío.",
      strategy: "Funnels de Inbound Marketing soportados con pauta en LinkedIn y Google Search de alta intención, complementados con secuencias personalizadas en HubSpot.",
      results: "Incremento del 130% en agendamiento de demos de calidad y reducción del ciclo de ventas en 18 días.",
      channels: ["HubSpot CRM", "LinkedIn Ads", "Content Gateways", "Google Search Ads"],
      externalUrl: "https://behance.net",
      featured: false
    },
    {
      id: "proj-6",
      title: "Kinetics — Lanzamiento E-Commerce & Social Commerce",
      client: "Kinetics Activewear",
      year: "2023",
      category: "E-commerce",
      coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
      highlightMetric: "+$240K en Ventas Q4",
      summary: "Campaña de temporada alta (Black Friday y Navidad) orquestando catálogo dinámico de Meta, retargeting agresivo y promociones de tiempo limitado.",
      challenge: "Superar el rendimiento del año anterior en un contexto de inflación y alta competencia en el sector fitness.",
      strategy: "Segmentación basada en eventos de navegación en tienda Shopify, ofertas flash escalonadas y anuncios de video con testimoniales reales.",
      results: "Aumento del 88% en volumen de pedidos y ROAS general de 5.1x durante toda la campaña.",
      channels: ["Shopify Plus", "Meta Catalog Ads", "Klaviyo", "Google Performance Max"],
      externalUrl: "https://behance.net",
      featured: false
    }
  ],
  services: [
    {
      id: "serv-1",
      title: "Estrategia de Marca & Posicionamiento",
      subtitle: "Construcción de marcas memorables y rentables",
      description: "Definición integral del ADN de marca, propuesta única de valor, mapa de audiencias y arquitectura de mensajes que diferencian el negocio en mercados competitivos.",
      deliverables: ["Brand Guidelines & Posicionamiento", "Definición de Buyer Personas", "Arquitectura de Mensajes & Tono de Voz", "Benchmark Competitivo & Diferenciación"],
      icon: "Sparkles"
    },
    {
      id: "serv-2",
      title: "Paid Media & Performance Marketing",
      subtitle: "Adquisición rentable y escala de campañas publicitarias",
      description: "Estructuración y optimización continua de presupuestos de pauta digital en plataformas clave. Foco en retorno sobre inversión (ROAS) y reducción de costos de adquisición (CAC).",
      deliverables: ["Meta Ads (Facebook & Instagram)", "Google Ads (Search, YouTube & Performance Max)", "TikTok Ads & Spark Ads", "Estrategias de Retargeting y Remarketing"],
      icon: "Target"
    },
    {
      id: "serv-3",
      title: "Dirección Creativa & Campañas 360",
      subtitle: "Conceptos publicitarios que generan tracción y ventas",
      description: "Ideación y dirección integral de campañas publicitarias que orquestan canales digitales y puntos de contacto clave, combinando estética de vanguardia y llamadas a la acción.",
      deliverables: ["Conceptos Creativos de Campaña", "Guiones para Video & Reels de Alta Retención", "Dirección de Arte y Assets Visuales", "Planificación de Medios y Calendarios"],
      icon: "Flame"
    },
    {
      id: "serv-4",
      title: "Social Media & Marketing de Contenidos",
      subtitle: "Storytelling omnicanal que conecta con la audiencia",
      description: "Desarrollo de estrategias editoriales y creación de comunidades digitales orgánicas que aumentan la lealtad de marca y el valor de vida del cliente (LTV).",
      deliverables: ["Estrategia de Contenidos Multiplataforma", "Video Marketing (Reels, TikTok & Shorts)", "Estrategias con Creadores de Contenido / UGC", "Community Management & Fidelización"],
      icon: "MessageSquareHeart"
    },
    {
      id: "serv-5",
      title: "Funnels de Conversión & Growth Marketing",
      subtitle: "Ecosistemas sistemáticos de captación y retención",
      description: "Diseño y optimización de embudos de conversión digitales que transforman tráfico calificado en leads y ventas mediante secuencias automatizadas y pruebas A/B.",
      deliverables: ["Automatización de Email Marketing en CRM", "Optimización de Landing Pages (CRO)", "Flujos de Nutrición de Prospectos", "Estrategias de Retención y Recuperación"],
      icon: "Workflow"
    },
    {
      id: "serv-6",
      title: "Analítica Digital & Optimización de ROI",
      subtitle: "Decisiones estratégicas fundamentadas en datos",
      description: "Implementación de dashboards en tiempo real, medición de atribución multicanal y análisis de métricas clave para maximizar la rentabilidad de cada inversión.",
      deliverables: ["Dashboards Ejecutivos en Looker Studio", "Configuración de Eventos en GA4", "Análisis de Atribución y Cohortes", "Reportes de Rendimiento para Dirección"],
      icon: "BarChart3"
    }
  ],
  tools: [
    { id: "t-1", name: "Meta Ads Manager", category: "Pauta & Ads", badge: "Avanzado" },
    { id: "t-2", name: "Google Ads", category: "Pauta & Ads", badge: "Certificada" },
    { id: "t-3", name: "TikTok Ads", category: "Pauta & Ads", badge: "Avanzado" },
    { id: "t-4", name: "Google Analytics 4 (GA4)", category: "Analítica", badge: "Especialista" },
    { id: "t-5", name: "Looker Studio", category: "Analítica", badge: "Dashboards" },
    { id: "t-6", name: "Semrush", category: "Estrategia", badge: "SEO & Benchmarking" },
    { id: "t-7", name: "HubSpot CRM", category: "Automatización & CRM", badge: "Inbound Certified" },
    { id: "t-8", name: "Klaviyo", category: "Automatización & CRM", badge: "E-commerce" },
    { id: "t-9", name: "Figma", category: "Diseño & Creativo", badge: "Wireframing & UI" },
    { id: "t-10", name: "Adobe Photoshop", category: "Diseño & Creativo", badge: "Piezas Gráficas" },
    { id: "t-11", name: "Adobe Premiere Pro", category: "Diseño & Creativo", badge: "Edición de Video" },
    { id: "t-12", name: "Shopify Plus", category: "Automatización & CRM", badge: "E-commerce" }
  ],
  education: [
    {
      id: "edu-1",
      degree: "Profesional en Mercadeo y Publicidad",
      institution: "Universidad Jorge Tadeo Lozano",
      period: "2015 - 2020",
      type: "Educación",
      credentialId: "Título Profesional con Honores Académicos"
    },
    {
      id: "edu-2",
      degree: "Diplomado en Data-Driven Marketing & Growth",
      institution: "Inesdi Business Techschool",
      period: "2021",
      type: "Educación",
      credentialId: "Especialización Digital"
    },
    {
      id: "edu-3",
      degree: "Meta Certified Digital Marketing Associate & Media Buyer",
      institution: "Meta Blueprint",
      period: "2023",
      type: "Certificación",
      credentialId: "ID: META-28491823"
    },
    {
      id: "edu-4",
      degree: "Google Ads Search & Video Professional Certification",
      institution: "Google Skillshop",
      period: "2024",
      type: "Certificación",
      credentialId: "Certificación Oficial Google"
    },
    {
      id: "edu-5",
      degree: "Inbound Marketing & Email Automation Master",
      institution: "HubSpot Academy",
      period: "2023",
      type: "Certificación",
      credentialId: "HubSpot Certified Professional"
    }
  ],
  process: [
    {
      id: "p-1",
      step: "01",
      title: "AUDITORÍA & DIAGNÓSTICO",
      tagline: "Inmersión en el mercado",
      description: "Auditoría integral del ecosistema actual de marketing, benchmarks de competidores directos y análisis profundo de los segmentos de audiencia objetivo."
    },
    {
      id: "p-2",
      step: "02",
      title: "ESTRATEGIA & FUNNELS",
      tagline: "El mapa de ruta",
      description: "Definición de objetivos cuantificables (CPA, ROAS, LTV), arquitectura del mensaje publicitario y selección de canales estratégicos de alto impacto."
    },
    {
      id: "p-3",
      step: "03",
      title: "DIRECCIÓN CREATIVA",
      tagline: "Impacto visual y persuasión",
      description: "Desarrollo de conceptos creativos innovadores, redacción de copys persuasivos y producción de assets visuales optimizados para retención."
    },
    {
      id: "p-4",
      step: "04",
      title: "EJECUCIÓN & DISTRIBUCIÓN",
      tagline: "Lanzamiento y tracking",
      description: "Configuración técnica rigurosa de eventos y píxeles, despliegue de pauta omnicanal y pruebas A/B continuas para validar hipótesis."
    },
    {
      id: "p-5",
      step: "05",
      title: "OPTIMIZACIÓN & ESCALA",
      tagline: "Rentabilidad data-driven",
      description: "Monitoreo de datos en tiempo real, optimización de presupuesto hacia creativos y audiencias ganadoras y escalado sistemático de resultados."
    }
  ],
  testimonials: [
    {
      id: "test-1",
      author: "Camila Restrepo",
      role: "CEO & Co-fundadora",
      company: "Aura Botanics",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "Trabajar con Juliana fue determinante para nuestro crecimiento. Su capacidad para combinar dirección creativa con optimización analítica nos permitió alcanzar un ROAS de 4.2x en tiempo récord. Su ética de trabajo remoto y comunicación son excepcionales.",
      metricResult: "+340% Crecimiento en ventas"
    },
    {
      id: "test-2",
      author: "Mauricio Valenzuela",
      role: "Head of Growth",
      company: "Niva Financial",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Juliana tiene una rara combinación de visión estratégica y ejecución implacable. Redujo nuestro CAC a la mitad manteniendo alta la calidad de los usuarios adquiridos. Es una líder de marketing destacada.",
      metricResult: "-45% En Costo de Adquisición"
    },
    {
      id: "test-3",
      author: "Sofía Méndez",
      role: "Directora de Operaciones",
      company: "Verve Architecture",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      quote: "Juliana reposicionó completamente nuestra marca digital. Su enfoque estructurado y dominio de canales pagos y orgánicos nos permitió captar clientes de alto valor adquisitivo.",
      metricResult: "4 Proyectos residenciales cerrados"
    }
  ],
  settings: {
    theme: "obsidian",
    adminPin: "juliana2025",
    siteTitle: "Juliana Rincón — Mercadeo & Publicidad Estratégica",
    presentationMode: "cv"
  }
}
