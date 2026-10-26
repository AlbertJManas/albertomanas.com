import Image from "next/image"
import type { Dictionary } from "@/app/[lang]/dictionaries"
import { Card, CardContent } from "@/components/ui/card"

// Lista de tecnologías con sus logos
const technologies = [
  { name: "Java", logo: "/java.svg" },
  { name: "TypeScript", logo: "/typescript.svg" },
  { name: "Spring Boot", logo: "/springboot.svg" },
  { name: "Hibernate", logo: "/hibernate.svg" },
  { name: "NestJS", logo: "/nestjs.svg" },
  { name: "Node.js", logo: "/nodejs.svg" },
  { name: "Next.js", logo: "/nextjs.svg" },
  { name: "React", logo: "/react.svg" },
  { name: "Keycloak", logo: "/keycloak.svg" },
  { name: "Strapi", logo: "/strapi.svg" },
  { name: "PostgreSQL", logo: "/postgresql.svg" },
  { name: "MongoDB", logo: "/mongodb.svg" },
  { name: "Oracle Cloud", logo: "/oracle.svg" },
  { name: "GitLab CI", logo: "/gitlab.svg" },
  { name: "Docker", logo: "/docker.svg" },
  { name: "Kubernetes", logo: "/kubernetes.svg" },
  { name: "AWS", logo: "/aws.svg" },
  { name: "Kafka", logo: "/kafka.svg" },
  { name: "OpenTelemetry", logo: "/opentelemetry.svg" },
  { name: "Git", logo: "/git.svg" },
  { name: "Mermaid", logo: "/mermaid.svg" },
  { name: "Figma", logo: "/figma.svg" },
  { name: "Claude", logo: "/claude.svg" },
  { name: "OpenAI", logo: "/openai.svg" },
]

export default function About({ dictionary }: { dictionary: Dictionary["about"] }) {
  return (
    <section id="about" className="bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{dictionary.title}</h2>
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-foreground/80 leading-relaxed">{dictionary.description}</p>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">{dictionary.technologies}</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <li key={tech.name}>
                <Card className="h-full border bg-card/50 hover:bg-card/80 transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <div className="w-10 h-10 mb-3 flex items-center justify-center">
                      <Image
                        src={tech.logo}
                        alt=""
                        width={40}
                        height={40}
                        className="max-w-full max-h-full dark:invert"
                      />
                    </div>
                    <span className="text-sm font-medium text-center">{tech.name}</span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
