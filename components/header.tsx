"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, FileText } from "lucide-react"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { Button } from "@/components/ui/button"
import { cvPath } from "@/lib/site"
import LanguageSwitcher from "./language-switcher"
import ThemeToggle from "./theme-toggle"

interface HeaderProps {
  lang: string
  dictionary: Dictionary["header"]
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: "#experience", label: dictionary.experience },
    { href: "#expertise", label: dictionary.expertise },
    { href: "#about", label: dictionary.about },
    { href: "#contact", label: dictionary.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={`/${lang}`} className="text-xl font-bold">
            Alberto Mañas
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-foreground/80 hover:text-foreground transition-colors">
                {item.label}
              </a>
            ))}
            <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
              <a href={cvPath(lang)} target="_blank" rel="noopener noreferrer">
                <FileText className="h-4 w-4" />
                {dictionary.downloadCV}
              </a>
            </Button>
            <div className="flex items-center space-x-2">
              <LanguageSwitcher currentLang={lang} label={dictionary.switchLanguage} />
              <ThemeToggle label={dictionary.toggleTheme} />
            </div>
          </nav>

          {/* Botón del menú móvil */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle label={dictionary.toggleTheme} />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? dictionary.closeMenu : dictionary.openMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Navegación móvil */}
        {isMenuOpen && (
          <nav id="mobile-menu" className="md:hidden pt-4 pb-2 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground/80 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button asChild variant="outline" size="sm" className="flex items-center gap-2 w-full justify-center my-2">
              <a href={cvPath(lang)} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                <FileText className="h-4 w-4" />
                {dictionary.downloadCV}
              </a>
            </Button>
            <div className="py-2">
              <LanguageSwitcher currentLang={lang} label={dictionary.switchLanguage} />
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
