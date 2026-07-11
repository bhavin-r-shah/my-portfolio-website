import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { learnings, categories, type LearningCategory } from "@/lib/learnings-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learnings/")({
  component: LearningsIndexPage,
  head: () => ({
    meta: [
      { title: "AI Learnings & Engineering Notes — Bhavin Shah" },
      {
        name: "description",
        content:
          "Practical AI engineering learnings, including LLM fundamentals, prompts, tokens, context windows, and production patterns.",
      },
      { property: "og:title", content: "AI Learnings & Engineering Notes — Bhavin Shah" },
      {
        property: "og:description",
        content: "A public learning journal on AI engineering and software craftsmanship.",
      },
      { property: "og:url", content: "/learnings" },
    ],
    links: [{ rel: "canonical", href: "/learnings" }],
  }),
});

function LearningsIndexPage() {
  const [active, setActive] = useState<LearningCategory | "All">("All");
  const filtered = active === "All" ? learnings : learnings.filter((n) => n.category === active);

  return (
    <div className="container-page my-10">
      <div className="mt-3 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <h2 className="display-serif text-4xl sm:text-5xl">
            My Learnings
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Documenting the concepts I am learning and translating my hand written notes into crisp
            mental models illutrated with diagrams and implementation handy nuances.
          </p>
        </div>
        {/* <div className="card-surface bg-primary/5 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Featured</p>
          <h2 className="mt-3 text-xl font-semibold">LLM 101: prompts, tokens, and context</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A beginner-friendly walkthrough from my handwritten AI engineering notes.
          </p>
          <Link
            to="/learnings/llm-101"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Read the blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div> */}
      </div>

      <div className="mt-10 flex flex-wrap gap-2">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              active === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => (
          <article key={n.slug} className="card-surface card-surface-hover flex flex-col p-6">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                {n.category}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {n.readingTime}
              </span>
            </div>
            <Link to="/learnings/llm-101" className="mt-4 text-lg font-semibold leading-snug text-primary">
              {n.title}
            </Link>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.summary}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
              <span className="font-mono text-muted-foreground">Updated {n.updated}</span>
              {n.slug === "llm-101" ? (
                <Link to="/learnings/llm-101" className="inline-flex items-center gap-1 text-accent">
                  Read <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <span className="text-muted-foreground">Coming soon</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
