import "server-only"

export type Locale = "es" | "en"

// La clave "cv" de los JSON no se usa en la web: la lee scripts/generate-cv.mjs para generar los PDF
export interface Dictionary {
  meta: {
    title: string
    description: string
  }
  header: {
    experience: string
    expertise: string
    about: string
    contact: string
    downloadCV: string
    openMenu: string
    closeMenu: string
    toggleTheme: string
    switchLanguage: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    contactButton: string
    downloadCV: string
    photoAlt: string
    facts: Array<{ label: string; value: string }>
  }
  experience: {
    title: string
    visit: string
    roles: Array<{
      company: string
      role: string
      period: string
      url: string
      image: string
      description: string
      highlights: string[]
      tags: string[]
    }>
  }
  expertise: {
    title: string
    areas: Array<{
      icon: string
      title: string
      description: string
      tags: string[]
    }>
  }
  about: {
    title: string
    description: string
    technologies: string
  }
  contact: {
    title: string
    description: string
    name: string
    email: string
    message: string
    submit: string
    sending: string
    success: string
    error: string
    validation: {
      name: string
      email: string
      message: string
    }
  }
  footer: {
    backToTop: string
  }
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
