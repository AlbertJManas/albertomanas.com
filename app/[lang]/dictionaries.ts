import "server-only"

interface Dictionary {
  header: {
    work: string
    about: string
    contact: string
    downloadCV: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    contactButton: string
    downloadCV: string
  }
  projects: {
    title: string
    viewProject: string
    role: string
    year: string
    projects: Array<{
      title: string
      description: string
      role: string
      year: string
      url: string
      image: string
    }>
  }
  about: {
    title: string
    description: string
    technologies: string
  }
  contact: {
    title: string
    name: string
    email: string
    message: string
    submit: string
    success: string
    error: string
  }
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: "es" | "en") => dictionaries[locale]()

