const skillGroups = [
  {
    category: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Design Tools",
    skills: ["Figma", "Photoshop", "Illustrator"],
  },
  {
    category: "Other",
    skills: ["WordPress", "Git", "Node.js", "REST APIs"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            What I use
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            {"Skills & Technologies"}
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category} className="flex flex-col gap-5">
              <h3 className="text-center text-lg font-semibold text-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
