import Image from "next/image"
import { ExternalLink } from "lucide-react"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { Card } from "@/components/ui/card"

export default function Experience({ dictionary }: { dictionary: Dictionary["experience"] }) {
  return (
    <section id="experience" className="bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-16 text-center">{dictionary.title}</h2>
        <div className="space-y-16 md:space-y-24">
          {dictionary.roles.map((role, index) => (
            <article
              key={`${role.company}-${role.period}`}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <Image
                    src={role.image}
                    alt={role.company}
                    width={1200}
                    height={675}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full h-auto object-cover aspect-video"
                  />
                </Card>
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-sm font-medium text-foreground/60">{role.period}</p>
                <h3 className="text-2xl font-bold mt-1">{role.role}</h3>
                <p className="text-lg text-foreground/80">{role.company}</p>
                <p className="text-foreground/70 mt-4 leading-relaxed">{role.description}</p>
                {role.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {role.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-foreground/70 leading-relaxed">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="flex flex-wrap gap-2 mt-5">
                  {role.tags.map((tag) => (
                    <li key={tag} className="rounded-full border px-3 py-1 text-xs font-medium text-foreground/80">
                      {tag}
                    </li>
                  ))}
                </ul>
                {role.url && (
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-5 text-primary hover:underline"
                  >
                    {dictionary.visit}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
