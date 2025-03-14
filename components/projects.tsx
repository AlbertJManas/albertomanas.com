import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Project {
  title: string
  description: string
  role: string
  year: string
  url: string
  image: string
}

interface ProjectsProps {
  lang: string
  dictionary: {
    title: string
    viewProject: string
    role: string
    year: string
    projects: Project[]
  }
}

export default function Projects({ dictionary }: ProjectsProps) {
  return (
    <section id="projects" className="bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">{dictionary.title}</h2>
        <div className="space-y-16 md:space-y-24">
          {dictionary.projects.map((project, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-video"
                  />
                </Card>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-foreground/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                  <div>
                    <span className="text-sm font-medium text-foreground/60">{dictionary.role}:</span>{" "}
                    <span>{project.role}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground/60">{dictionary.year}:</span>{" "}
                    <span>{project.year}</span>
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  {dictionary.viewProject}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

