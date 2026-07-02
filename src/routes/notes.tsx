import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, ArrowUpRight } from "lucide-react";
import { notes, categories, type NoteCategory } from "@/lib/notes-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notes")({
  component: NotesPage,
  head: () => ({
    meta: [
      { title: "Learning Notes — Bhavin Shah" },
      { name: "description", content: "Working notes on AI engineering, React & frontend, DSA patterns, sustainable web, and system design basics." },
      { property: "og:title", content: "Learning Notes — Bhavin Shah" },
      { property: "og:description", content: "A knowledge-base of practical engineering notes." },
      { property: "og:url", content: "/notes" },
    ],
    links: [{ rel: "canonical", href: "/notes" }],
  }),
});

function NotesPage() {
  const [active, setActive] = useState<NoteCategory | "All">("All");
  const filtered = active === "All" ? notes : notes.filter((n) => n.category === active);

  return (
    <div className="container-page py-20">
      <p className="eyebrow">Learning notes</p>
      <h1 className="display-serif mt-3 max-w-3xl text-5xl sm:text-6xl">
        A working knowledge base — not a blog.
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Short, opinionated notes I keep as I learn. Categorized so recruiters
        and engineers can jump straight to what's relevant.
      </p>

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
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[11px] text-primary">{n.category}</span>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <Clock className="h-3 w-3" /> {n.readingTime}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold leading-snug text-foreground">{n.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{n.summary}</p>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
              <span className="font-mono text-muted-foreground">Updated {n.updated}</span>
              {n.related && (
                <a href={n.related.href} target={n.related.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-1 text-primary">
                  {n.related.label} <ArrowUpRight className="h-3 w-3" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
