"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, Send, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

type FeedbackItem = {
  id: string
  name: string
  message: string
  rating: number
  created_at: string
}

function StarRating({
  value,
  onChange,
}: {
  value: number
  onChange: (rating: number) => void
}) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
          role="radio"
          aria-checked={value === star}
        >
          <Star
            className={`h-6 w-6 transition-colors ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {value > 0 ? `${value}/5` : "Select rating"}
      </span>
    </div>
  )
}

function ReadOnlyStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

function FeedbackCard({ item }: { item: FeedbackItem }) {
  const date = new Date(item.created_at)
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {item.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-card-foreground">{item.name}</p>
            <ReadOnlyStars rating={item.rating} />
          </div>
        </div>
        <time
          dateTime={item.created_at}
          className="shrink-0 text-xs text-muted-foreground"
        >
          {formattedDate}, {formattedTime}
        </time>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {item.message}
      </p>
    </div>
  )
}

export function Feedback() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  const fetchFeedback = useCallback(async () => {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setFeedbackList(data)
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchFeedback()

    const channel = supabase
      .channel("feedback-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feedback" },
        (payload) => {
          setFeedbackList((prev) => {
            const exists = prev.some((item) => item.id === payload.new.id)
            if (exists) return prev
            return [payload.new as FeedbackItem, ...prev]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchFeedback, supabase])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim() || !message.trim()) {
      setError("Please fill in your name and message.")
      return
    }
    if (rating === 0) {
      setError("Please select a rating.")
      return
    }

    setIsSubmitting(true)
    const { error: insertError } = await supabase.from("feedback").insert({
      name: name.trim(),
      message: message.trim(),
      rating,
    })

    setIsSubmitting(false)

    if (insertError) {
      setError("Failed to submit feedback. Please try again.")
      return
    }

    setSubmitSuccess(true)
    setName("")
    setMessage("")
    setRating(0)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  return (
    <section id="feedback" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Feedback
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
            What People Say
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Your feedback helps me improve. Share your thoughts and see what others have said.
          </p>
        </div>

        {/* Feedback Cards */}
        <div className="mb-16">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">
                Loading feedback...
              </span>
            </div>
          ) : feedbackList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 py-12 text-center">
              <p className="text-muted-foreground">
                No feedback yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {feedbackList.map((item) => (
                <FeedbackCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Feedback Form */}
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h3 className="mb-6 font-serif text-xl font-semibold text-card-foreground">
              Leave Your Feedback
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="feedback-name"
                  className="mb-1.5 block text-sm font-medium text-card-foreground"
                >
                  Name
                </label>
                <input
                  id="feedback-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Rating
                </label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div>
                <label
                  htmlFor="feedback-message"
                  className="mb-1.5 block text-sm font-medium text-card-foreground"
                >
                  Message
                </label>
                <textarea
                  id="feedback-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your feedback..."
                  rows={4}
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              {submitSuccess && (
                <p className="text-sm text-accent" role="status">
                  Thank you for your feedback!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
