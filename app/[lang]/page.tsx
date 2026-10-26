import Header from "@/components/header"
import Hero from "@/components/hero"
import Experience from "@/components/experience"
import Expertise from "@/components/expertise"
import About from "@/components/about"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { getDictionary, type Locale } from "./dictionaries"

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Esperar a que los parámetros estén disponibles
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)

  return (
    <main className="min-h-screen bg-background">
      <Header lang={lang} dictionary={dict.header} />
      <Hero lang={lang} dictionary={dict.hero} />
      <Experience dictionary={dict.experience} />
      <Expertise dictionary={dict.expertise} />
      <About dictionary={dict.about} />
      <Contact dictionary={dict.contact} />
      <Footer dictionary={dict.footer} />
    </main>
  )
}
