import Image from "next/image"
import { Linkedin, FileText } from "lucide-react"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { Button } from "@/components/ui/button"
import { cvPath, links } from "@/lib/site"

interface HeroProps {
  lang: string
  dictionary: Dictionary["hero"]
}

export default function Hero({ lang, dictionary }: HeroProps) {
  return (
    <section id="top" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Contenido de texto */}
          <div className="w-full md:w-3/5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">{dictionary.title}</h1>
            <p className="text-xl md:text-2xl font-medium text-foreground/80 mb-6">{dictionary.subtitle}</p>
            <p className="text-lg text-foreground/70 mb-8 leading-relaxed max-w-2xl">{dictionary.description}</p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button asChild size="lg" className="rounded-full">
                <a href="#contact">{dictionary.contactButton}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full flex items-center gap-2">
                <a href={cvPath(lang)} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-5 w-5" />
                  {dictionary.downloadCV}
                </a>
              </Button>
              <div className="flex gap-3">
                <Button asChild variant="outline" size="icon" className="rounded-full">
                  <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Foto de perfil y datos clave */}
          <div className="w-full md:w-2/5 flex justify-center md:justify-end">
            <div className="w-full max-w-xs">
              <div className="relative mx-auto w-64 h-64 md:w-72 md:h-72 overflow-hidden rounded-full border-4 border-primary/20">
                <Image
                  src="/profile-photo.jpg"
                  alt={dictionary.photoAlt}
                  fill
                  sizes="288px"
                  style={{ objectFit: "cover" }}
                  priority
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
              <dl className="mt-8 rounded-lg border bg-card/50 divide-y text-sm">
                {dictionary.facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4 px-4 py-2.5">
                    <dt className="text-foreground/60">{fact.label}</dt>
                    <dd className="font-medium text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
