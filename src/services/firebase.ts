import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  Firestore,
  Unsubscribe
} from 'firebase/firestore'
import { FirebaseConfig, PortfolioData } from '../types/portfolio'

const CONFIG_STORAGE_KEY = 'juliana_firebase_config'
const COLLECTION_NAME = 'portfolio'
const DOCUMENT_ID = 'juliana'

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: "AIzaSyDFIjUy4T5mMRYQLYsegqdms860XauEszc",
  authDomain: "portfoliojuliana.firebaseapp.com",
  projectId: "portfoliojuliana",
  storageBucket: "portfoliojuliana.firebasestorage.app",
  messagingSenderId: "957720651556",
  appId: "1:957720651556:web:cce02f192ea20f3089b5b1"
}

/**
 * Parses user input which might be JSON or a JS object snippet from the Firebase Console
 */
export function parseFirebaseConfigInput(input: string): FirebaseConfig | null {
  if (!input || !input.trim()) return null

  // 1. Try JSON parse first
  try {
    const parsed = JSON.parse(input)
    if (parsed.apiKey && parsed.projectId) {
      return {
        apiKey: parsed.apiKey.trim(),
        authDomain: parsed.authDomain?.trim() || '',
        projectId: parsed.projectId.trim(),
        storageBucket: parsed.storageBucket?.trim() || '',
        messagingSenderId: parsed.messagingSenderId?.trim() || '',
        appId: parsed.appId?.trim() || ''
      }
    }
  } catch {
    // Not valid JSON, try regex extraction of JS object keys
  }

  // 2. Extract keys using regex for "key: 'value'" or 'key: "value"'
  const extractKey = (key: string): string => {
    const regex = new RegExp(`${key}\\s*:\\s*["']([^"']+)["']`, 'i')
    const match = input.match(regex)
    return match ? match[1].trim() : ''
  }

  const apiKey = extractKey('apiKey')
  const projectId = extractKey('projectId')
  const authDomain = extractKey('authDomain')
  const storageBucket = extractKey('storageBucket')
  const messagingSenderId = extractKey('messagingSenderId')
  const appId = extractKey('appId')

  if (apiKey && projectId) {
    return {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId
    }
  }

  return null
}

/**
 * Retrieve active Firebase config: either from localStorage (user entered in CMS)
 * or from Vite environment variables (.env)
 */
export function getActiveFirebaseConfig(): FirebaseConfig | null {
  // Check localStorage first
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored) as FirebaseConfig
      if (parsed.apiKey && parsed.projectId) {
        return parsed
      }
    }
  } catch (err) {
    console.error('Error reading Firebase config from localStorage:', err)
  }

  // Check Vite env variables
  const envApiKey = import.meta.env.VITE_FIREBASE_API_KEY
  const envProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID

  if (envApiKey && envProjectId) {
    return {
      apiKey: envApiKey,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
      projectId: envProjectId,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
    }
  }

  // Fallback to built-in default Firebase config
  return DEFAULT_FIREBASE_CONFIG
}

export function saveStoredFirebaseConfig(config: FirebaseConfig): void {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config))
  } catch (err) {
    console.error('Error saving Firebase config to localStorage:', err)
  }
}

export function clearStoredFirebaseConfig(): void {
  try {
    localStorage.removeItem(CONFIG_STORAGE_KEY)
  } catch (err) {
    console.error('Error removing Firebase config from localStorage:', err)
  }
}

/**
 * Initializes Firebase App and returns Firestore instance if configured
 */
export function getFirebaseFirestore(): { app: FirebaseApp; db: Firestore } | null {
  const config = getActiveFirebaseConfig()
  if (!config || !config.apiKey || !config.projectId) {
    return null
  }

  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config)
    const db = getFirestore(app)
    return { app, db }
  } catch (err) {
    console.error('Failed to initialize Firebase:', err)
    return null
  }
}

/**
 * Test Firebase connection with a read/write probe
 */
export async function testFirebaseConnection(config?: FirebaseConfig): Promise<{
  success: boolean
  message: string
}> {
  try {
    const cfg = config || getActiveFirebaseConfig()
    if (!cfg || !cfg.apiKey || !cfg.projectId) {
      return { success: false, message: 'Faltan credenciales (apiKey o projectId).' }
    }

    const app = getApps().length > 0 ? getApp() : initializeApp(cfg)
    const db = getFirestore(app)
    const docRef = doc(db, COLLECTION_NAME, DOCUMENT_ID)
    
    // Attempt read probe
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return {
        success: true,
        message: '¡Conexión exitosa! Los datos del portafolio fueron encontrados en Firestore.'
      }
    } else {
      return {
        success: true,
        message: '¡Conexión exitosa! Firestore está listo para recibir la primera sincronización de datos.'
      }
    }
  } catch (err: any) {
    console.error('Firebase test connection failed:', err)
    const errorMsg = err?.message || String(err)
    if (errorMsg.includes('permission-denied') || errorMsg.includes('insufficient permissions')) {
      return {
        success: false,
        message: 'Error de permisos: Las reglas de Firestore están bloqueando el acceso. Configura las reglas en modo prueba o permite lectura/escritura.'
      }
    }
    return {
      success: false,
      message: `Error al conectar con Firestore: ${errorMsg}`
    }
  }
}

/**
 * Load portfolio data from Cloud Firestore
 */
export async function loadPortfolioFromFirestore(): Promise<PortfolioData | null> {
  const firebase = getFirebaseFirestore()
  if (!firebase) return null

  try {
    const docRef = doc(firebase.db, COLLECTION_NAME, DOCUMENT_ID)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      return snapshot.data() as PortfolioData
    }
    return null
  } catch (err) {
    console.error('Error fetching portfolio from Firestore:', err)
    return null
  }
}

/**
 * Save portfolio data to Cloud Firestore
 */
export async function savePortfolioToFirestore(data: PortfolioData): Promise<boolean> {
  const firebase = getFirebaseFirestore()
  if (!firebase) return false

  try {
    const docRef = doc(firebase.db, COLLECTION_NAME, DOCUMENT_ID)
    // Firestore plain object serialization
    const cleanData = JSON.parse(JSON.stringify(data))
    await setDoc(docRef, cleanData, { merge: true })
    return true
  } catch (err) {
    console.error('Error saving portfolio to Firestore:', err)
    return false
  }
}

/**
 * Subscribe to real-time updates from Cloud Firestore
 */
export function subscribeToPortfolioFromFirestore(
  onData: (data: PortfolioData) => void,
  onError?: (error: any) => void
): Unsubscribe | null {
  const firebase = getFirebaseFirestore()
  if (!firebase) return null

  try {
    const docRef = doc(firebase.db, COLLECTION_NAME, DOCUMENT_ID)
    return onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const cloudData = snapshot.data() as PortfolioData
          onData(cloudData)
        }
      },
      (error) => {
        console.error('Firestore snapshot subscription error:', error)
        if (onError) onError(error)
      }
    )
  } catch (err) {
    console.error('Failed to subscribe to Firestore:', err)
    return null
  }
}
