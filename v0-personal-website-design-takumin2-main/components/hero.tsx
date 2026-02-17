import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,oklch(0.55_0.18_250/0.06),transparent_70%)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
        {/* Copy */}
        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Available for freelance
          </span>

          <h1 className="text-balance font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Hi, I{"'"}m{" "}
            <span className="text-primary">Sarah Johnson</span>
          </h1>

          <p className="text-xl font-medium text-muted-foreground md:text-2xl">
            Web Developer & Designer
          </p>

          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            I create beautiful, functional websites that help businesses grow.
            Blending clean code with thoughtful design to deliver digital
            experiences that truly resonate.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
            >
              View My Work
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-secondary"
            >
              <Mail className="h-4 w-4" />
              Get In Touch
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/hero-photo.jpg"
              alt="Sarah Johnson, Web Developer and Designer"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl border-2 border-primary/20" />
        </div>
      </div>
    </section>
  )
}
