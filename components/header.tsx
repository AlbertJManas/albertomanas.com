"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./language-switcher"
import ThemeToggle from "./theme-toggle"

interface HeaderProps {
  lang: string
  dictionary: {
    work: string
    about: string
    contact: string
    downloadCV: string
  }
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: `/${lang}#projects`, label: dictionary.work },
    { href: `/${lang}#about`, label: dictionary.about },
    { href: `/${lang}#contact`, label: dictionary.contact },
  ]

  // Función para descargar el CV según el idioma
  const downloadCV = () => {
    const cvPath = lang === "es" ? "/cv-alberto-manas-es.pdf" : "/cv-alberto-manas-en.pdf"
    window.open(cvPath, "_blank")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold">
            Alberto Mañas
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={downloadCV} aria-label="Download CV">
              <FileText className="h-4 w-4" />
              {dictionary.downloadCV}
            </Button>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher currentLang={lang} />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full justify-center my-2"
              aria-label="Download CV"
              onClick={() => {
                downloadCV()
                setIsMenuOpen(false)
              }}
            >
              <FileText className="h-4 w-4" />
              {dictionary.downloadCV}
            </Button>
            <div className="py-2">
              <LanguageSwitcher currentLang={lang} />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

