"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  lang: string
  dictionary: {
    title: string
    subtitle: string
    description: string
    contactButton: string
    downloadCV: string
  }
}

export default function Hero({ lang, dictionary }: HeroProps) {
  // Función para descargar el CV según el idioma
  const downloadCV = () => {
    const cvPath = lang === "es" ? "/cv-alberto-manas-es.pdf" : "/cv-alberto-manas-en.pdf"
    window.open(cvPath, "_blank")
  }

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Contenido de texto */}
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{dictionary.title}</h1>
            <h2 className="text-xl md:text-2xl text-foreground/80 mb-6">{dictionary.subtitle}</h2>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">{dictionary.description}</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link href={`/${lang}#contact`}>
                <Button size="lg" className="rounded-full">
                  {dictionary.contactButton}
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-full flex items-center gap-2" onClick={downloadCV}>
                <FileText className="h-5 w-5" />
                {dictionary.downloadCV}
              </Button>
              <div className="flex gap-3 mt-4 md:mt-0">
                <a href="https://github.com/albertomanas" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </a>
                <a
                  href="https://linkedin.com/in/albertomanas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

                  {/* Foto de perfil */}
                  <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src="/profile-photo.jpg"
                alt="Alberto Mañas"
                fill
                style={{ objectFit: "cover" }}
                priority
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

