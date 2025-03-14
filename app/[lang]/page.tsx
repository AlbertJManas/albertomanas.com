import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import About from "@/components/about"
import Contact from "@/components/contact"
import { getDictionary } from "./dictionaries"

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Esperar a que los parámetros estén disponibles
  const { lang } = await params
  const dict = await getDictionary(lang as "es" | "en")

  return (
    <main className="min-h-screen bg-background">
      <Header lang={lang} dictionary={dict.header} />
      <Hero lang={lang} dictionary={dict.hero} />
      <Projects lang={lang} dictionary={dict.projects} />
      <About lang={lang} dictionary={dict.about} />
      <Contact lang={lang} dictionary={dict.contact} />
    </main>
  )
}

