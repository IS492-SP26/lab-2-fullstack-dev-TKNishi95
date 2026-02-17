"use client"

import { useState, type FormEvent } from "react"
import { Send, Mail, Github, Linkedin, Twitter } from "lucide-react"

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-secondary/40 py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            {"Let's talk"}
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Feedback
          </h2>
          <div className="mt-4 h-1 w-12 rounded-full bg-primary" />
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <Send className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  {"Thanks for reaching out. I'll get back to you shortly."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-semibold text-primary hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    className="resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                >
                  Send Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-foreground">
                Email Me
              </h3>
              <a
                href="mailto:sarah@example.com"
                className="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
              >
                <Mail className="h-5 w-5" />
                sarah@example.com
              </a>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Follow Me
              </h3>
              <div className="flex gap-4">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} profile`}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-sm"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {"Let's Work Together"}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {"I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to drop me a line!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
