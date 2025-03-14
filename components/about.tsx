import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface AboutProps {
  lang: string
  dictionary: {
    title: string
    description: string
    technologies: string
  }
}

export default function About({ dictionary }: AboutProps) {
  // Lista de tecnologías con sus logos
  const technologies = [
    { name: "Java", logo: "/java.svg" },
    { name: "Spring Boot", logo: "/spring.svg" },
    { name: "Hibernate", logo: "/hibernate.svg" },
    { name: "Docker", logo: "/docker.svg" },
    { name: "Kubernetes", logo: "/kubernetes.svg" },
    { name: "AWS", logo: "/aws.svg" },
    { name: "Jenkins", logo: "/jenkins.svg" },
    { name: "Git", logo: "/git.svg" },
    { name: "Maven", logo: "/maven.svg" },
    { name: "PostgreSQL", logo: "/postgresql.svg" },
    { name: "MongoDB", logo: "/mongodb.svg" },
    { name: "Kafka", logo: "/kafka.svg" },
  ]

  return (
    <section id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">{dictionary.title}</h2>
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-foreground/80 leading-relaxed">{dictionary.description}</p>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">{dictionary.technologies}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech) => (
              <Card key={tech.name} className="border bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    <Image
                      src={tech.logo || "/placeholder.svg"}
                      alt={tech.name}
                      width={48}
                      height={48}
                      className="max-w-full max-h-full dark:invert"
                    />
                  </div>
                  <span className="text-sm font-medium">{tech.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

