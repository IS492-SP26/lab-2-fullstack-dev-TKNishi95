const interests = [
  { label: "Coffee", icon: "☕" },
  { label: "Photography", icon: "📸" },
  { label: "Travel", icon: "✈️" },
  { label: "Coding", icon: "💻" },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Get to know me
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            About Me
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-5">
          {/* Bio */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <p className="leading-relaxed text-muted-foreground">
              I{"'"}m a passionate web developer and designer based in San
              Francisco with over 5 years of experience creating digital
              products. I love turning complex problems into simple, beautiful,
              and intuitive designs.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              My journey started with a curiosity for how things work on the
              internet, which quickly grew into a career building everything from
              small business sites to large-scale web applications. I believe
              that great design isn{"'"}t just about how something looks, but how
              it works.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I{"'"}m not coding, you can find me exploring new coffee
              shops, capturing street photography, or planning my next travel
              adventure. I{"'"}m always excited to take on new challenges and
              collaborate with like-minded people.
            </p>
          </div>

          {/* Interests */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              Things I Enjoy
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <span className="text-2xl" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
