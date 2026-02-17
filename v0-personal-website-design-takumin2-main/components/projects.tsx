import Image from "next/image"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "E-commerce Store",
    description:
      "A full-featured online store with cart functionality, payment processing, and a beautiful product showcase.",
    image: "/images/project-ecommerce.jpg",
    tags: ["React", "Next.js", "Stripe"],
  },
  {
    title: "Restaurant Website",
    description:
      "A modern restaurant site with online reservations, dynamic menus, and stunning food photography.",
    image: "/images/project-restaurant.jpg",
    tags: ["WordPress", "CSS", "JavaScript"],
  },
  {
    title: "Portfolio Blog",
    description:
      "A clean, minimal blog platform with markdown support, dark mode, and lightning-fast page loads.",
    image: "/images/project-blog.jpg",
    tags: ["Next.js", "Tailwind", "MDX"],
  },
]

export function Projects() {
  return (
    <section
      id="projects"
      className="scroll-mt-24 bg-secondary/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Recent work
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            My Projects
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <h3 className="text-lg font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-3 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                  View Project
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
