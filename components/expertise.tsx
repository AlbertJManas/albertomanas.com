import { Blocks, Bot, Cloud, Code, type LucideIcon } from "lucide-react"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const icons: Record<string, LucideIcon> = {
  architecture: Blocks,
  devops: Cloud,
  development: Code,
  ai: Bot,
}

export default function Expertise({ dictionary }: { dictionary: Dictionary["expertise"] }) {
  return (
    <section id="expertise">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{dictionary.title}</h2>
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {dictionary.areas.map((area) => {
            const Icon = icons[area.icon] ?? Code

            return (
              <Card key={area.title} className="bg-card/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-xl">{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 leading-relaxed">{area.description}</p>
                  <ul className="flex flex-wrap gap-2 mt-5">
                    {area.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
